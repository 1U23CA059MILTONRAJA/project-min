// issue-book/issue.js
// Issue Book module. Records are shared through LocalStorage with the books and members pages.

const STORAGE_KEYS = {
  books: "books",
  members: "members",
  issuedBooks: "issuedBooks"
};

let isIssuing = false;   // true while a submission is being processed (stops double submits)

// ---------- Small helpers ----------

function getElement(id) {
  return document.getElementById(id);
}

// Make sure malformed or unavailable LocalStorage data does not break page rendering.
function asArray(value) {
  return Array.isArray(value) ? value : [];
}

// Call a shared getter safely. If it fails, the page still loads with an empty list.
function readList(getter) {
  try {
    return asArray(getter());
  } catch (error) {
    console.error("Could not read saved data:", error);
    return [];
  }
}

function readStorageList(key) {
  const raw = localStorage.getItem(key);
  if (!raw) return [];
  const data = JSON.parse(raw);
  if (!Array.isArray(data)) throw new TypeError("Saved " + key + " data is not a list.");
  return data.filter(function (item) { return item && typeof item === "object"; });
}

function getMembersSafe() { return readList(function () { return readStorageList(STORAGE_KEYS.members); }); }
function getBooksSafe() { return readList(function () { return readStorageList(STORAGE_KEYS.books); }); }
function getIssuesSafe() { return readList(function () { return readStorageList(STORAGE_KEYS.issuedBooks); }); }

function getBookId(book) { return book.id !== undefined ? book.id : book.bookId; }
function getBookName(book) { return book.name || book.bookName; }
function getMemberName(member) { return member.memberName || member.name; }

// IDs may be stored as numbers in one place and text in another (a <select> always gives text),
// so compare them as text.
function sameId(a, b) {
  const first = String(a === undefined || a === null ? "" : a).trim();
  const second = String(b === undefined || b === null ? "" : b).trim();
  return first !== "" && first === second;
}

// Show a stored value, or "-" when it is missing.
function textOrDash(value) {
  return value === undefined || value === null || String(value).trim() === "" ? "-" : String(value);
}

// ---------- Messages ----------

// Show feedback in the issue form.
function showFormMessage(type, text) {
  const box = getElement("issueFormMessage");
  if (!box) return;
  box.textContent = text;
  box.className = "message " + type;
}

function clearFormMessage() {
  const box = getElement("issueFormMessage");
  if (!box) return;
  box.textContent = "";
  box.className = "message";
}

// ---------- Dropdowns ----------

function createOption(value, text) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = text;   // textContent: names are shown as plain text, never as HTML
  return option;
}

function populateIssueDropdowns() {
  const memberSelect = getElement("memberSelect");
  const bookSelect = getElement("bookSelect");

  if (!memberSelect || !bookSelect) return;

  const selectedMember = memberSelect.value;   // remember the current choices
  const selectedBook = bookSelect.value;

  // Members
  memberSelect.replaceChildren(createOption("", "Select Member"));
  getMembersSafe().forEach(function (member) {
    if (!member || member.memberId === undefined) return;
    memberSelect.appendChild(createOption(member.memberId, textOrDash(getMemberName(member))));
  });

  // Books: only books that still have copies available
  bookSelect.replaceChildren(createOption("", "Select Book"));
  getBooksSafe().forEach(function (book) {
    if (!book || getBookId(book) === undefined) return;
    const available = Number(book.quantity);
    if (!isFinite(available) || available <= 0) return;
    bookSelect.appendChild(createOption(getBookId(book), textOrDash(getBookName(book)) + " (" + available + " available)"));
  });

  // Put the choices back if they still exist (otherwise the first option stays selected)
  memberSelect.value = selectedMember;
  bookSelect.value = selectedBook;
}

// ---------- Issue records table ----------

function addCell(row, text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  row.appendChild(cell);
  return cell;
}

function createStatusBadge(status) {
  const badge = document.createElement("span");
  const label = textOrDash(status);
  badge.className = "status-badge status-" + label.toLowerCase().replace(/[^a-z]/g, "");
  badge.textContent = label;
  return badge;
}

function renderIssueTable() {
  const tbody = getElement("issueTableBody");
  if (!tbody) return;

  const issues = getIssuesSafe();
  tbody.replaceChildren();

  if (issues.length === 0) {
    const row = document.createElement("tr");
    const cell = addCell(row, "No issue records yet.");
    cell.colSpan = 6;
    tbody.appendChild(row);
    return;
  }

  // Newest record first (same order as before)
  issues.slice().reverse().forEach(function (issue) {
    if (!issue || typeof issue !== "object") return;   // skip damaged entries
    const row = document.createElement("tr");
    addCell(row, textOrDash(issue.issueId));
    addCell(row, textOrDash(issue.memberName));
    addCell(row, textOrDash(issue.bookName));
    addCell(row, textOrDash(issue.issueDate));
    addCell(row, textOrDash(issue.returnDate));
    addCell(row, "").appendChild(createStatusBadge(issue.status));
    tbody.appendChild(row);
  });
}

// ---------- Issuing a book ----------

// Create an ID that no existing record uses: ISS-<time>, plus 1, 2, ... if that is ever taken.
function generateIssueId(issues) {
  const base = Date.now();
  let offset = 0;
  function isUsed(id) {
    return issues.some(function (issue) { return issue && sameId(issue.issueId, id); });
  }
  while (isUsed("ISS-" + (base + offset))) offset++;
  return "ISS-" + (base + offset);
}

// Save the books and issue records together, restoring their previous values on failure.
function saveIssue(originalBooks, updatedBooks, updatedIssues) {
  let originalIssues;
  try {
    originalIssues = localStorage.getItem(STORAGE_KEYS.issuedBooks);
    localStorage.setItem(STORAGE_KEYS.books, JSON.stringify(updatedBooks));
    localStorage.setItem(STORAGE_KEYS.issuedBooks, JSON.stringify(updatedIssues));
    return true;
  } catch (error) {
    console.error("Saving failed:", error);
    try {
      localStorage.setItem(STORAGE_KEYS.books, JSON.stringify(originalBooks));
      if (originalIssues === null || originalIssues === undefined) {
        localStorage.removeItem(STORAGE_KEYS.issuedBooks);
      } else {
        localStorage.setItem(STORAGE_KEYS.issuedBooks, originalIssues);
      }
    } catch (undoError) {
      console.error("Could not restore issue data after saving failed:", undoError);
    }
    return false;
  }
}

// Call a refresh function from another module only if it exists.
function callIfAvailable(owner, functionName) {
  if (owner && typeof owner[functionName] === "function") {
    try {
      owner[functionName]();
    } catch (error) {
      console.error(functionName + " failed:", error);
    }
  }
}

function refreshOtherModules() {
  callIfAvailable(window, "renderBookTable");
  callIfAvailable(window, "renderReturnTable");
}

// Keep the Return Date picker from offering dates before the Issue Date.
function syncReturnDateMin() {
  const issueDateInput = getElement("issueDate");
  const returnDateInput = getElement("returnDate");
  if (issueDateInput && returnDateInput) returnDateInput.min = issueDateInput.value || "";
}

function getLocalDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}

function setIssueDateDefaults() {
  const issueDateInput = getElement("issueDate");
  if (!issueDateInput) return;

  const today = getLocalDateString(new Date());
  issueDateInput.max = today;
  if (!issueDateInput.value) issueDateInput.value = today;
  syncReturnDateMin();
}

function handleIssueSubmit(event) {
  event.preventDefault();                     // stop the page from reloading
  if (isIssuing) return;                      // ignore a second click while busy

  const issueForm = getElement("issueForm");
  const submitButton = issueForm.querySelector('button[type="submit"]');
  isIssuing = true;
  if (submitButton) submitButton.disabled = true;

  // Re-enable the button. After a success we wait a moment so a double-click cannot repeat the action.
  function finish(delay) {
    setTimeout(function () {
      isIssuing = false;
      if (submitButton) submitButton.disabled = false;
    }, delay);
  }

  function fail(message) {
    showFormMessage("error", message);
    finish(0);
  }

  const memberId = getElement("memberSelect").value;
  const bookId = getElement("bookSelect").value;
  const issueDate = getElement("issueDate").value;
  const returnDate = getElement("returnDate").value;
  const today = getLocalDateString(new Date());

  // 1. Required fields
  if (!memberId || !bookId || !issueDate || !returnDate) {
    return fail("Please complete all issue form fields.");
  }

  if (issueDate > today) {
    return fail("Issue date cannot be in the future.");
  }

  // 2. Return date must not be earlier than the issue date (YYYY-MM-DD text compares correctly)
  if (returnDate < issueDate) {
    return fail("Return date cannot be before the issue date.");
  }

  // 3. Member and book must exist (compared as text, see sameId)
  const members = getMembersSafe();
  const books = getBooksSafe();
  const issues = getIssuesSafe();
  const selectedMember = members.find(function (member) { return member && sameId(member.memberId, memberId); });
  const selectedBook = books.find(function (book) { return book && sameId(getBookId(book), bookId); });

  if (!selectedMember) return fail("Selected member does not exist.");
  if (!selectedBook) return fail("Selected book does not exist.");

  // 4. The book must have copies available (a missing or non-numeric quantity counts as unavailable)
  const available = Number(selectedBook.quantity);
  if (!isFinite(available) || available <= 0) {
    return fail("Book is currently unavailable.");
  }

  // 5. The same member cannot hold the same book twice at once
  const alreadyIssued = issues.some(function (issue) {
    return issue && sameId(issue.memberId, selectedMember.memberId) && sameId(issue.bookId, getBookId(selectedBook)) &&
           String(issue.status).trim().toLowerCase() === "issued";
  });
  if (alreadyIssued) return fail("This member already has this book issued.");

  // 6. Build the new data. The old book objects are not changed, so we can undo if saving fails.
  const updatedBooks = books.map(function (book) {
    return book === selectedBook ? Object.assign({}, book, { quantity: available - 1 }) : book;
  });

  const issueRecord = {
    issueId: generateIssueId(issues),
    memberId: selectedMember.memberId,
    memberName: getMemberName(selectedMember),
    bookId: getBookId(selectedBook),
    bookName: getBookName(selectedBook),
    issueDate: issueDate,
    returnDate: returnDate,
    status: "Issued"
  };

  const updatedIssues = issues.concat([issueRecord]);

  if (!saveIssue(books, updatedBooks, updatedIssues)) {
    return fail("Could not save the issue record. Nothing was changed. Please try again.");
  }

  // 7. Success: reset the form and refresh everything that shows books or issues
  issueForm.reset();
  setIssueDateDefaults();
  populateIssueDropdowns();
  renderIssueTable();
  refreshOtherModules();

  showFormMessage("success", "Book issued successfully.");
  finish(1000);
}

// ---------- Start ----------

document.addEventListener("DOMContentLoaded", function () {
  populateIssueDropdowns();
  renderIssueTable();

  const issueForm = getElement("issueForm");
  if (issueForm) issueForm.addEventListener("submit", handleIssueSubmit);

  const issueDateInput = getElement("issueDate");
  if (issueDateInput) {
    setIssueDateDefaults();
    issueDateInput.addEventListener("change", syncReturnDateMin);
  }

  // The Reset button also clears any old message
  const resetButton = document.querySelector(".reset-btn");
  if (resetButton) {
    resetButton.addEventListener("click", function () {
      clearFormMessage();
      setTimeout(setIssueDateDefaults, 0);   // after the browser has cleared the fields
    });
  }

  // Keep the lists fresh when data changes in another tab or when coming back with the Back button
  function refreshLists() {
    populateIssueDropdowns();
    renderIssueTable();
  }
  window.addEventListener("storage", refreshLists);
  window.addEventListener("pageshow", refreshLists);
});

// Other modules may call these, so they stay available
window.populateIssueDropdowns = populateIssueDropdowns;
window.renderIssueTable = renderIssueTable;