// dashboard/dashboard.js
// Reads library records from LocalStorage and fills the dashboard.
// LocalStorage is for learning/prototyping only: any user of the browser can read or edit it.

// ---------- Storage keys ----------
const BOOKS_STORAGE_KEY = "books";
const MEMBERS_STORAGE_KEY = "members";
const TRANSACTIONS_STORAGE_KEY = "issuedBooks";
const USER_STORAGE_KEY = "user"; // account saved by the register page

// ---------- Settings ----------
const MAX_ACTIVITIES = 8;
const MAX_RECENT_BOOKS = 5;
const MAX_RECENT_RETURNS = 4;

// Icon shapes (each icon is a list of SVG path strings)
const ICONS = {
  book: ["M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z", "M4 21V5"],
  student: ["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  issue: ["M5 12h14", "M13 6l6 6-6 6"],
  returned: ["M19 12H5", "M11 6l-6 6 6 6"]
};
const SVG_NS = "http://www.w3.org/2000/svg";

// ---------- Small helpers ----------

function byId(id) {
  return document.getElementById(id);
}

// Read a list from LocalStorage. Always returns an array (empty if missing or invalid).
function readList(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.filter(function (item) { return item && typeof item === "object"; });
  } catch (error) {
    return [];
  }
}

// Return a clean string, or the fallback if the value is missing/empty.
function textOr(value, fallback) {
  if (typeof value === "number") return String(value);
  if (typeof value === "string" && value.trim() !== "") return value.trim();
  return fallback;
}

// Convert a stored value to a Date, or null if it is missing/invalid.
function parseDate(value) {
  if (value === null || value === undefined || value === "") return null;
  // A date-only string like "2026-10-21" is read as LOCAL time, so the day never shifts.
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value.trim())) {
    const parts = value.trim().split("-");
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  }
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
}

// "21 Oct 2026, 10:30 am" (time is skipped when only a date was stored)
function formatDate(value) {
  const date = parseDate(value);
  if (!date) return "Date not recorded";
  const dateText = date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  const dateOnly = typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value.trim());
  if (dateOnly) return dateText;
  const timeText = date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  return dateText + ", " + timeText;
}

// Sort newest first. Records without a valid date go to the end.
function sortNewestFirst(items, getDateValue) {
  function time(item) {
    const date = parseDate(getDateValue(item));
    return date ? date.getTime() : -Infinity;
  }
  return items.slice().sort(function (a, b) {
    const ta = time(a);
    const tb = time(b);
    if (ta === tb) return 0;
    return tb > ta ? 1 : -1;
  });
}

function getIssueDate(transaction) {
  return transaction.issuedAt || transaction.issueDate;
}

function getReturnDate(transaction) {
  return transaction.returnedAt || transaction.returnDate;
}

function getMemberName(transaction) {
  return textOr(transaction.studentName, textOr(transaction.memberName, "unknown student"));
}

function hasStatus(transaction, status) {
  return String(transaction.status || "").trim().toLowerCase() === status;
}

// ---------- Safe DOM builders (textContent only, never innerHTML) ----------

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function createIcon(name) {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "18");
  svg.setAttribute("height", "18");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("aria-hidden", "true");
  (ICONS[name] || ICONS.book).forEach(function (d) {
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", d);
    svg.appendChild(path);
  });
  return svg;
}

function createItem(iconName, title, meta, badgeText) {
  const item = createElement("li", "item");
  const icon = createElement("span", "item__icon");
  icon.appendChild(createIcon(iconName));
  const body = createElement("div", "item__body");
  body.appendChild(createElement("div", "item__title", title));
  body.appendChild(createElement("div", "item__meta", meta));
  item.appendChild(icon);
  item.appendChild(body);
  if (badgeText) item.appendChild(createElement("span", "badge", badgeText));
  return item;
}

// Fill a list element, or show an empty-state message.
function renderList(listId, items, emptyMessage) {
  const list = byId(listId);
  if (!list) return; // safe if the element is missing
  list.replaceChildren();
  if (items.length === 0) {
    list.appendChild(createElement("li", "empty-state", emptyMessage));
    return;
  }
  items.forEach(function (item) { list.appendChild(item); });
}

function setStat(id, value) {
  const element = byId(id);
  if (element) element.textContent = String(value);
}

// ---------- Dashboard sections ----------

function renderStats(books, members, transactions) {
  setStat("totalBooks", books.length);
  setStat("totalMembers", members.length);
  setStat("issuedBooks", transactions.filter(function (t) { return hasStatus(t, "issued"); }).length);
  setStat("returnedBooks", transactions.filter(function (t) { return hasStatus(t, "returned"); }).length);
}

function renderActivity(books, members, transactions) {
  const events = [];

  books.forEach(function (book) {
    events.push({ icon: "book", date: book.dateAdded,
      title: "New book added: " + textOr(book.name, textOr(book.bookName, "Untitled book")) });
  });

  members.forEach(function (member) {
    events.push({ icon: "student", date: member.joinDate || member.createdAt,
      title: "New member registered: " + textOr(member.memberName, textOr(member.studentName, "Unnamed member")) });
  });

  transactions.forEach(function (t) {
    const book = textOr(t.bookName, "Untitled book");
    const student = getMemberName(t);
    events.push({ icon: "issue", date: getIssueDate(t), title: "Book issued: " + book + " to " + student });
    if (hasStatus(t, "returned")) {
      events.push({ icon: "returned", date: getReturnDate(t), title: "Book returned: " + book + " by " + student });
    }
  });

  const items = sortNewestFirst(events, function (e) { return e.date; })
    .slice(0, MAX_ACTIVITIES)
    .map(function (e) { return createItem(e.icon, e.title, formatDate(e.date)); });

  renderList("activityList", items, "No library activity yet. Add a book or register a member to get started.");
}

function renderRecentBooks(books) {
  const items = sortNewestFirst(books, function (b) { return b.dateAdded; })
    .slice(0, MAX_RECENT_BOOKS)
    .map(function (b) {
      const meta = textOr(b.author, "Author not recorded") + " | " +
                   textOr(b.category, "Uncategorized") + " | " + formatDate(b.dateAdded);
      return createItem("book", textOr(b.name, textOr(b.bookName, "Untitled book")), meta);
    });

  renderList("recentBooks", items, "No books added yet.");
}

function renderRecentReturns(transactions) {
  const returned = transactions.filter(function (t) { return hasStatus(t, "returned"); });
  const items = sortNewestFirst(returned, getReturnDate)
    .slice(0, MAX_RECENT_RETURNS)
    .map(function (t) {
      const meta = getMemberName(t) + " | Returned on " + formatDate(getReturnDate(t));
      // The badge uses a check mark AND text, so status is not shown by color alone
      return createItem("returned", textOr(t.bookName, "Untitled book"), meta, "\u2713 Returned");
    });

  renderList("recentReturns", items, "No books have been returned yet.");
}

// Show the logged-in user's name only if it really exists in the stored account.
function renderWelcomeUser() {
  const element = byId("welcomeUser");
  if (!element) return;
  let name = "";
  try {
    const user = JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
    if (user && typeof user.username === "string") name = user.username.trim();
  } catch (error) {
    name = "";
  }
  element.textContent = name ? "Signed in as " + name : "";
  element.hidden = !name;
}

// ---------- Main render ----------

function renderDashboard() {
  const books = readList(BOOKS_STORAGE_KEY);
  const members = readList(MEMBERS_STORAGE_KEY);
  const transactions = readList(TRANSACTIONS_STORAGE_KEY);

  renderWelcomeUser();
  renderStats(books, members, transactions);
  renderActivity(books, members, transactions);
  renderRecentBooks(books);
  renderRecentReturns(transactions);
}

// ---------- Mobile menu ----------

function setupMobileMenu() {
  const toggle = byId("menuToggle");
  const menu = byId("navMenu");
  if (!toggle || !menu) return;

  function setMenu(open) {
    menu.classList.toggle("is-open", open);
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", function () {
    setMenu(!menu.classList.contains("is-open"));
  });
}

// ---------- Start and keep fresh ----------

setupMobileMenu();
renderDashboard();

window.addEventListener("storage", renderDashboard);   // changes made in ANOTHER tab
window.addEventListener("pageshow", renderDashboard);  // coming back with the browser Back button
document.addEventListener("visibilitychange", function () {
  if (!document.hidden) renderDashboard();             // switching back to this tab
});