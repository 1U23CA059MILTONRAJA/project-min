// members page/addmember.js
// Member Management: add, edit, delete, search, filter and statistics.
// Data is saved in LocalStorage (learning/prototype only - anyone can read or edit it).

// ---------- Settings ----------
const MEMBERS_STORAGE_KEY = "members";
const LOGIN_FLAG = "isLoggedIn";          // set by login.js
const MEMBERSHIP_TYPES = ["Student", "Staff", "Faculty", "General"];
const FIRST_MEMBER_NUMBER = 1001;         // first ID is MEM-1001
const NOTIFICATION_MS = 4000;             // how long a toast stays visible

// ---------- Page elements (all IDs exist in addmember.html) ----------
const memberListSection = document.getElementById("memberList");
const memberFormSection = document.getElementById("memberFormSection");
const memberForm = document.getElementById("addMemberForm");
const formTitle = document.getElementById("formTitle");
const editIndexInput = document.getElementById("editIndex");
const saveBtn = document.getElementById("saveBtn");
const backBtn = document.getElementById("backBtn");
const addMemberBtn = document.getElementById("addMemberBtn");
const formMessage = document.getElementById("formMessage");
const tableBody = document.getElementById("memberTableBody");
const searchInput = document.getElementById("memberSearch");
const membershipFilter = document.getElementById("membershipFilter");
const resultCount = document.getElementById("resultCount");
const toast = document.getElementById("toast");
const memberIdInput = document.getElementById("memberId");
const joinDateInput = document.getElementById("joinDate");

// Each form field paired with its error message element
const fields = {
  name: { input: document.getElementById("memberName"), error: document.getElementById("nameError") },
  email: { input: document.getElementById("email"), error: document.getElementById("emailError") },
  phone: { input: document.getElementById("phone"), error: document.getElementById("phoneError") },
  address: { input: document.getElementById("address"), error: document.getElementById("addressError") },
  membership: { input: document.getElementById("membershipType"), error: document.getElementById("membershipError") },
  date: { input: joinDateInput, error: document.getElementById("dateError") }
};

let toastTimer = null;

// ---------- LocalStorage ----------

// Read all members. Returns [] if data is missing or damaged, so the page never crashes.
function loadMembers() {
  try {
    const raw = localStorage.getItem(MEMBERS_STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.filter(function (member) { return member && typeof member === "object"; });
  } catch (error) {
    return [];
  }
}

// Save all members. Returns true on success, false if the browser refused.
function saveMembers(members) {
  try {
    localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(members));
    return true;
  } catch (error) {
    return false;
  }
}

// ---------- Small helpers ----------

// Show a stored value as text, or a fallback when it is empty.
function textOr(value, fallback) {
  if (value === undefined || value === null || String(value).trim() === "") return fallback;
  return String(value);
}

function lower(value) {
  return String(value === undefined || value === null ? "" : value).trim().toLowerCase();
}

// Today as "YYYY-MM-DD" in the user's LOCAL time (toISOString would use UTC and can be a day off).
function getTodayString() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return now.getFullYear() + "-" + month + "-" + day;
}

// "2026-10-21" -> "21 Oct 2026". Returns "-" if the value is missing or invalid.
function formatDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || "").trim());
  if (!match) return "-";
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  if (isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

// ---------- Notifications ----------

// Show a toast message. It hides itself after a few seconds.
function showNotification(message, type) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.className = "toast toast--" + type;
  toast.hidden = false;
  toastTimer = setTimeout(function () { toast.hidden = true; }, NOTIFICATION_MS);
}

// ---------- Join date and input restrictions ----------

// Today is the latest date the user can pick.
function restrictJoinDate() {
  joinDateInput.max = getTodayString();
}

// Keep unwanted characters out of the fields while the user types or pastes.
function setupInputRestrictions() {
  // Name: letters and spaces only
  fields.name.input.addEventListener("input", function () {
    fields.name.input.value = fields.name.input.value.replace(/[^A-Za-z ]/g, "");
  });

  // Phone: digits only, maximum 10
  fields.phone.input.addEventListener("input", function () {
    fields.phone.input.value = fields.phone.input.value.replace(/\D/g, "").slice(0, 10);
  });
}

// ---------- Member ID ----------

// Create the next ID: MEM-1001, MEM-1002, ... always higher than every existing ID.
function generateMemberId(members) {
  let highest = FIRST_MEMBER_NUMBER - 1;
  const used = {};

  members.forEach(function (member) {
    const id = String(member.memberId || "").toUpperCase();
    used[id] = true;
    const match = /^MEM-(\d+)$/.exec(id);
    if (match && Number(match[1]) > highest) highest = Number(match[1]);
  });

  let next = highest + 1;
  while (used["MEM-" + next]) next++; // safety: never return an ID that already exists
  return "MEM-" + next;
}

// ---------- Validation ----------

// Read the form. Text is trimmed; extra spaces inside the name are collapsed.
function readFormValues() {
  return {
    memberId: memberIdInput.value.trim(),
    memberName: fields.name.input.value.trim().replace(/\s+/g, " "),
    email: fields.email.input.value.trim(),
    phone: fields.phone.input.value.trim(),
    address: fields.address.input.value.trim(),
    membershipType: fields.membership.input.value,
    joinDate: joinDateInput.value
  };
}

// Which member is being edited? Returns the array index, or -1 in Add mode.
function getEditIndex() {
  return editIndexInput.value === "" ? -1 : Number(editIndexInput.value);
}

// Is this email/phone already used by a DIFFERENT member? (ignoreIndex = the member being edited)
function isDuplicate(members, property, value, ignoreIndex) {
  return members.some(function (member, index) {
    return index !== ignoreIndex && lower(member[property]) === lower(value);
  });
}

// Check one field. Returns an error message, or "" when the field is valid.
function validateField(key, values, members, ignoreIndex) {
  switch (key) {
    case "name":
      if (values.memberName === "") return "Member name is required.";
      if (!/^[A-Za-z ]+$/.test(values.memberName)) return "Name can contain letters and spaces only.";
      if (values.memberName.length < 5 || values.memberName.length > 15) return "Name must be 5 to 15 characters long.";
      return "";

    case "email":
      if (values.email === "") return "Email address is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) return "Enter a valid email, like name@example.com.";
      if (isDuplicate(members, "email", values.email, ignoreIndex)) return "This email is already registered to another member.";
      return "";

    case "phone":
      if (values.phone === "") return "Phone number is required.";
      if (!/^\d{10}$/.test(values.phone)) return "Phone number must be exactly 10 digits.";
      if (isDuplicate(members, "phone", values.phone, ignoreIndex)) return "This phone number is already registered to another member.";
      return "";

    case "address":
      // Address is optional: empty is fine
      if (values.address.length > 150) return "Address must be 150 characters or fewer.";
      return "";

    case "membership":
      if (values.membershipType === "") return "Please select a membership type.";
      if (MEMBERSHIP_TYPES.indexOf(values.membershipType) === -1) return "Please choose one of the listed membership types.";
      return "";

    case "date": {
      if (values.joinDate === "") return "Join date is required.";
      const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(values.joinDate);
      const parsed = match ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])) : null;
      const isRealDate = parsed && parsed.getMonth() === Number(match[2]) - 1 && parsed.getDate() === Number(match[3]);
      if (!isRealDate) return "Enter a valid join date.";
      if (values.joinDate > getTodayString()) return "Join date cannot be in the future."; // same-format strings compare correctly
      return "";
    }

    default:
      return "";
  }
}

// Show a red border and message under one field.
function showError(input, errorElement, message) {
  errorElement.textContent = message;
  input.classList.remove("is-valid");
  input.classList.add("is-invalid");
  input.setAttribute("aria-invalid", "true");
}

// Show a green border and remove the message.
function showValid(input, errorElement) {
  errorElement.textContent = "";
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
  input.removeAttribute("aria-invalid");
}

// Remove all error messages and colored borders (used when opening/leaving the form).
function clearErrors() {
  Object.keys(fields).forEach(function (key) {
    const field = fields[key];
    field.error.textContent = "";
    field.input.classList.remove("is-invalid", "is-valid");
    field.input.removeAttribute("aria-invalid");
  });
  formMessage.textContent = "";
}

// Live validation of a single field (runs when the user leaves it or fixes an error).
function checkField(key) {
  const values = readFormValues();
  const message = validateField(key, values, loadMembers(), getEditIndex());
  const field = fields[key];

  if (message) {
    showError(field.input, field.error, message);
  } else if (key === "address" && values.address === "") {
    field.error.textContent = "";                       // empty optional field: no colour at all
    field.input.classList.remove("is-invalid", "is-valid");
    field.input.removeAttribute("aria-invalid");
  } else {
    showValid(field.input, field.error);
  }
}

function setupLiveValidation() {
  Object.keys(fields).forEach(function (key) {
    const input = fields[key].input;
    input.addEventListener("blur", function () { checkField(key); });
    input.addEventListener("change", function () { checkField(key); });
    // While typing: only re-check fields that are currently showing an error, so it disappears once fixed
    input.addEventListener("input", function () {
      if (input.classList.contains("is-invalid")) checkField(key);
    });
  });
}

// ---------- Switching between list and form ----------

function showMemberList() {
  memberFormSection.hidden = true;
  memberListSection.hidden = false;
  clearErrors();                 // old messages are removed
  editIndexInput.value = "";
  displayMembers();              // refresh table and statistics
}

function showAddMember() {
  memberListSection.hidden = true;
  memberFormSection.hidden = false;

  memberForm.reset();                                   // clear old values
  editIndexInput.value = "";                            // Add mode
  clearErrors();
  restrictJoinDate();
  memberIdInput.value = generateMemberId(loadMembers());
  formTitle.textContent = "Add New Member";
  saveBtn.textContent = "Save Member";
  fields.name.input.focus();
}

function editMember(index) {
  const members = loadMembers();
  const member = members[index];
  if (!member) return;

  memberListSection.hidden = true;
  memberFormSection.hidden = false;

  memberForm.reset();
  clearErrors();
  restrictJoinDate();

  editIndexInput.value = String(index);                 // Edit mode
  memberIdInput.value = textOr(member.memberId, "");    // the ID never changes
  fields.name.input.value = textOr(member.memberName, "");
  fields.email.input.value = textOr(member.email, "");
  fields.phone.input.value = textOr(member.phone, "");
  fields.address.input.value = textOr(member.address, "");
  fields.membership.input.value = textOr(member.membershipType, "");
  joinDateInput.value = textOr(member.joinDate, "");

  formTitle.textContent = "Edit Member";
  saveBtn.textContent = "Update Member";
  fields.name.input.focus();
}

// ---------- Save (add or update) ----------

function saveMember(event) {
  event.preventDefault();                               // stop the page from reloading
  clearErrors();

  const members = loadMembers();
  const editIndex = getEditIndex();
  const isEditing = editIndex >= 0;

  // The member may have been removed in another tab while this form was open
  if (isEditing && !members[editIndex]) {
    showNotification("That member no longer exists.", "error");
    showMemberList();
    return;
  }

  const values = readFormValues();

  // Validate every field and show all errors at once
  let firstInvalid = null;
  Object.keys(fields).forEach(function (key) {
    const message = validateField(key, values, members, editIndex);
    if (message) {
      showError(fields[key].input, fields[key].error, message);
      if (!firstInvalid) firstInvalid = fields[key].input;
    } else if (!(key === "address" && values.address === "")) {
      showValid(fields[key].input, fields[key].error);
    }
  });

  if (firstInvalid) {
    formMessage.textContent = "Please correct the highlighted fields.";
    firstInvalid.focus();
    return;
  }

  // Build the member object using the existing property names
  const memberData = {
    memberId: values.memberId,
    memberName: values.memberName,
    email: values.email.toLowerCase(),
    phone: values.phone,
    address: values.address,
    membershipType: values.membershipType,
    joinDate: values.joinDate
  };

  let successText;
  if (isEditing) {
    // UPDATE: keep the original ID and any extra properties other modules may have added
    memberData.memberId = members[editIndex].memberId;
    members[editIndex] = Object.assign({}, members[editIndex], memberData);
    successText = "Member updated successfully.";
  } else {
    // ADD: make sure the ID is still unused (another tab may have added a member meanwhile)
    if (isDuplicate(members, "memberId", memberData.memberId, -1)) {
      memberData.memberId = generateMemberId(members);
    }
    members.push(memberData);
    successText = "Member added successfully.";
  }

  if (!saveMembers(members)) {
    formMessage.textContent = "Could not save the member. Check that browser storage is enabled.";
    return;
  }

  showMemberList();
  showNotification(successText, "success");
}

// ---------- Delete ----------

function deleteMember(index) {
  const members = loadMembers();
  const member = members[index];
  if (!member) return;

  const label = textOr(member.memberName, "this member") + " (" + textOr(member.memberId, "no ID") + ")";
  if (!window.confirm("Delete member " + label + "? This cannot be undone.")) return; // Cancel = do nothing

  members.splice(index, 1);                             // remove only the selected member
  if (!saveMembers(members)) {
    showNotification("Could not delete the member. Check that browser storage is enabled.", "error");
    return;
  }

  displayMembers();
  showNotification("Member deleted successfully.", "success");
}

// ---------- Statistics ----------

function updateStatistics(members) {
  function countType(type) {
    return members.filter(function (member) { return lower(member.membershipType) === lower(type); }).length;
  }
  document.getElementById("totalMembers").textContent = members.length;
  document.getElementById("studentCount").textContent = countType("Student");
  document.getElementById("staffCount").textContent = countType("Staff");
  document.getElementById("facultyCount").textContent = countType("Faculty");
  document.getElementById("generalCount").textContent = countType("General");
}

// ---------- Search and filter ----------

// Does this member match the search text AND the selected membership type?
// This only decides what is shown - it never changes the stored data.
function memberMatches(member, query, type) {
  if (type !== "" && lower(member.membershipType) !== lower(type)) return false;
  if (query === "") return true;
  return [member.memberId, member.memberName, member.email, member.phone].some(function (value) {
    return lower(value).includes(query);
  });
}

searchInput.addEventListener("input", displayMembers);
membershipFilter.addEventListener("change", displayMembers);

// ---------- Table ----------

// Add one text cell to a row (textContent is safe: it never runs HTML typed by a user).
function addTableCell(row, text, className) {
  const cell = document.createElement("td");
  cell.textContent = text;
  if (className) cell.className = className;
  row.appendChild(cell);
}

function createActionButton(label, className, ariaLabel, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "btn btn--small " + className;
  button.textContent = label;
  button.setAttribute("aria-label", ariaLabel);
  button.addEventListener("click", onClick);
  return button;
}

// Redraw statistics and the table from what is saved right now.
function displayMembers() {
  const members = loadMembers();
  const query = lower(searchInput.value);
  const type = membershipFilter.value;
  let shown = 0;

  updateStatistics(members);
  tableBody.replaceChildren();

  members.forEach(function (member, index) {
    if (!memberMatches(member, query, type)) return;
    shown++;

    const row = document.createElement("tr");
    const name = textOr(member.memberName, "this member");
    addTableCell(row, textOr(member.memberId, "-"));
    addTableCell(row, textOr(member.memberName, "-"));
    addTableCell(row, textOr(member.email, "-"));
    addTableCell(row, textOr(member.phone, "-"));
    addTableCell(row, textOr(member.address, "-"), "cell-address");
    addTableCell(row, textOr(member.membershipType, "-"));
    addTableCell(row, formatDate(member.joinDate));

    // "index" is the position in the SAVED list, so Edit/Delete hit the right member even when filtered
    const actionCell = document.createElement("td");
    const group = document.createElement("div");
    group.className = "row-actions";
    group.appendChild(createActionButton("Edit", "btn--edit", "Edit " + name, function () { editMember(index); }));
    group.appendChild(createActionButton("Delete", "btn--delete", "Delete " + name, function () { deleteMember(index); }));
    actionCell.appendChild(group);
    row.appendChild(actionCell);

    tableBody.appendChild(row);
  });

  if (shown === 0) {
    const row = document.createElement("tr");
    addTableCell(row, members.length === 0
      ? "No members registered yet. Click \"+ Add Member\" to register the first member."
      : "No members match your search or filter.", "table-empty");
    row.firstChild.colSpan = 8;
    tableBody.appendChild(row);
  }

  resultCount.textContent = members.length === 0 ? "" : "Showing " + shown + " of " + members.length + " members";
}

// ---------- Navigation: logout and mobile menu ----------

// Clear the login flag on logout (the link itself goes to the login page)
document.getElementById("logoutLink").addEventListener("click", function () {
  try { localStorage.removeItem(LOGIN_FLAG); } catch (error) { /* ignore */ }
});

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {
  const open = !navMenu.classList.contains("is-open");
  navMenu.classList.toggle("is-open", open);
  menuToggle.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

// ---------- Start ----------

addMemberBtn.addEventListener("click", showAddMember);
backBtn.addEventListener("click", showMemberList);
memberForm.addEventListener("submit", saveMember);

restrictJoinDate();
setupInputRestrictions();
setupLiveValidation();
displayMembers();                                        // show saved members when the page opens
window.addEventListener("storage", displayMembers);      // changes made in another tab