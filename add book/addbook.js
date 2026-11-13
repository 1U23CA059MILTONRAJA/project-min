// books/addbook.js
// Book Management: add, edit, delete, search, filter and statistics.
// Data is saved in LocalStorage (learning/prototype only - anyone can read or edit it).

// ---------- Settings ----------
const BOOKS_STORAGE_KEY = "books";   // storage key for all books
const LOGIN_FLAG = "isLoggedIn";     // set by login.js
const CURRENT_YEAR = new Date().getFullYear();

// Which book is being edited? null means "Add mode".
let editingId = null;

// ---------- Page elements (all IDs exist in addbook.html) ----------
const form = document.getElementById("bookForm");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const formMessage = document.getElementById("formMessage");
const listMessage = document.getElementById("listMessage");
const tableBody = document.getElementById("bookTableBody");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const resultCount = document.getElementById("resultCount");

// Form inputs, each paired with its error element
const fields = {
  id: { input: document.getElementById("bookId"), error: document.getElementById("bookIdError") },
  name: { input: document.getElementById("bookName"), error: document.getElementById("bookNameError") },
  author: { input: document.getElementById("author"), error: document.getElementById("authorError") },
  category: { input: document.getElementById("category"), error: document.getElementById("categoryError") },
  publisher: { input: document.getElementById("publisher"), error: null },
  year: { input: document.getElementById("year"), error: document.getElementById("yearError") },
  quantity: { input: document.getElementById("quantity"), error: document.getElementById("quantityError") }
};

// ---------- LocalStorage ----------

// Read all books. Returns [] if data is missing or damaged, so the page never crashes.
function loadBooks() {
  try {
    const raw = localStorage.getItem(BOOKS_STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.filter(function (book) { return book && typeof book === "object"; });
  } catch (error) {
    return [];
  }
}

// Save all books. Returns true on success, false if the browser refused.
function saveBooks(books) {
  try {
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));
    return true;
  } catch (error) {
    return false;
  }
}

// ---------- Small helpers ----------

// Book IDs are compared without caring about upper/lower case: "b001" equals "B001".
function idKey(id) {
  return String(id === undefined || id === null ? "" : id).trim().toLowerCase();
}

function findBookIndex(books, id) {
  return books.findIndex(function (book) { return idKey(book.id) === idKey(id); });
}

// Show a stored value as text, or a fallback when it is empty.
function textOr(value, fallback) {
  if (value === undefined || value === null || String(value).trim() === "") return fallback;
  return String(value);
}

function showMessage(element, text, type) {
  element.textContent = text;
  element.className = "message message--" + type;
}

function clearMessage(element) {
  element.textContent = "";
  element.className = "message";
}

// ---------- Form: values, errors, modes ----------

// Read the form and trim the text fields.
function readFormValues() {
  return {
    id: fields.id.input.value.trim(),
    name: fields.name.input.value.trim(),
    author: fields.author.input.value.trim(),
    category: fields.category.input.value,
    publisher: fields.publisher.input.value.trim(),
    year: fields.year.input.value.trim(),
    quantity: fields.quantity.input.value.trim()
  };
}

function clearErrors() {
  Object.keys(fields).forEach(function (key) {
    const field = fields[key];
    field.input.removeAttribute("aria-invalid");
    if (field.error) field.error.textContent = "";
  });
  clearMessage(formMessage);
}

function showFieldError(key, message) {
  fields[key].error.textContent = message;
  fields[key].input.setAttribute("aria-invalid", "true");
}

// Check the values. Returns an object like { id: "message", year: "message" } (empty = valid).
// ignoreIndex lets a book being edited keep its own ID without counting as a duplicate.
function validateBook(values, books, ignoreIndex) {
  const errors = {};

  if (values.id === "") {
    errors.id = "Book ID is required.";
  } else {
    const duplicate = books.some(function (book, index) {
      return index !== ignoreIndex && idKey(book.id) === idKey(values.id);
    });
    if (duplicate) errors.id = "This Book ID already exists. Please use a different ID.";
  }

  if (values.name === "") errors.name = "Book name is required.";
  if (values.author === "") errors.author = "Author name is required.";
  if (values.category === "") errors.category = "Please select a category.";

  // Year is optional, but if typed it must be a whole number from 1000 to this year
  if (values.year !== "") {
    const year = Number(values.year);
    if (!/^\d+$/.test(values.year) || year < 1000 || year > CURRENT_YEAR) {
      errors.year = "Enter a year between 1000 and " + CURRENT_YEAR + ", or leave it blank.";
    }
  }

  // Quantity must be a whole number of 1 or more
  if (values.quantity === "") {
    errors.quantity = "Quantity is required.";
  } else if (!/^\d+$/.test(values.quantity) || Number(values.quantity) < 1) {
    errors.quantity = "Quantity must be a whole number of 1 or more.";
  }

  return errors;
}

// Switch the form between "Add Book" mode and "Update Book" mode.
function setFormMode(isEditing) {
  formTitle.textContent = isEditing ? "Edit Book" : "Add New Book";
  submitBtn.textContent = isEditing ? "Update Book" : "Add Book";
  cancelEditBtn.hidden = !isEditing;
}

// Empty the form and go back to Add mode.
function resetForm() {
  form.reset();
  editingId = null;
  setFormMode(false);
  clearErrors();
}

// ---------- Add / Update ----------

form.addEventListener("submit", function (event) {
  event.preventDefault();          // stop the page from reloading
  clearErrors();
  clearMessage(listMessage);

  const values = readFormValues();
  const books = loadBooks();
  const editIndex = editingId === null ? -1 : findBookIndex(books, editingId);
  const errors = validateBook(values, books, editIndex);

  // Show every error under its field and stop
  const errorKeys = Object.keys(errors);
  if (errorKeys.length > 0) {
    errorKeys.forEach(function (key) { showFieldError(key, errors[key]); });
    showMessage(formMessage, "Please fix the highlighted fields and try again.", "error");
    fields[errorKeys[0]].input.focus();
    return;
  }

  // Build the book object (numbers are stored as numbers)
  const book = {
    id: values.id,
    name: values.name,
    author: values.author,
    category: values.category,
    publisher: values.publisher,
    year: values.year === "" ? "" : Number(values.year),
    quantity: Number(values.quantity)
  };

  let updatedBooks = books.slice();
  let successText;

  if (editIndex >= 0) {
    // UPDATE: replace the old record, keep its dateAdded (so the dashboard can still sort by it)
    book.dateAdded = books[editIndex].dateAdded;
    updatedBooks[editIndex] = book;
    successText = "Book updated successfully.";
  } else {
    // ADD: new record at the end
    book.dateAdded = new Date().toISOString();
    updatedBooks.push(book);
    successText = "Book added successfully.";
  }

  if (!saveBooks(updatedBooks)) {
    showMessage(formMessage, "Could not save the book. Check that browser storage is enabled.", "error");
    return;
  }

  resetForm();
  showMessage(formMessage, successText, "success");
  renderBooks();
});

// ---------- Edit ----------

function startEdit(id) {
  const books = loadBooks();
  const index = findBookIndex(books, id);
  if (index < 0) return;
  const book = books[index];

  clearErrors();
  clearMessage(listMessage);

  // A saved category might not be in the dropdown (old data), so add it if needed
  const category = textOr(book.category, "");
  const hasOption = Array.from(fields.category.input.options).some(function (option) {
    return option.value === category;
  });
  if (category !== "" && !hasOption) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    fields.category.input.appendChild(option);
  }

  fields.id.input.value = textOr(book.id, "");
  fields.name.input.value = textOr(book.name, "");
  fields.author.input.value = textOr(book.author, "");
  fields.category.input.value = category;
  fields.publisher.input.value = textOr(book.publisher, "");
  fields.year.input.value = textOr(book.year, "");
  fields.quantity.input.value = textOr(book.quantity, "");

  editingId = book.id;
  setFormMode(true);
  form.scrollIntoView({ behavior: "smooth", block: "start" });
  fields.name.input.focus();
}

cancelEditBtn.addEventListener("click", function () {
  resetForm();
  showMessage(formMessage, "Edit cancelled.", "success");
});

// ---------- Delete ----------

function deleteBook(id) {
  const books = loadBooks();
  const index = findBookIndex(books, id);
  if (index < 0) return;

  const name = textOr(books[index].name, "this book");
  if (!window.confirm('Delete "' + name + '"? This cannot be undone.')) return; // Cancel = do nothing

  books.splice(index, 1); // remove only the selected book
  if (!saveBooks(books)) {
    showMessage(listMessage, "Could not delete the book. Check that browser storage is enabled.", "error");
    return;
  }

  // If that book was open in the form, close the edit mode
  if (editingId !== null && idKey(editingId) === idKey(id)) resetForm();

  renderBooks();
  showMessage(listMessage, "Book deleted successfully.", "success");
}

// ---------- Clear all ----------

clearAllBtn.addEventListener("click", function () {
  const books = loadBooks();
  if (books.length === 0) {
    showMessage(listMessage, "There are no books to clear.", "error");
    return;
  }
  if (!window.confirm("Delete ALL " + books.length + " books? This cannot be undone.")) return;

  if (!saveBooks([])) {
    showMessage(listMessage, "Could not clear the books. Check that browser storage is enabled.", "error");
    return;
  }

  resetForm();
  renderBooks();
  showMessage(listMessage, "All books were deleted.", "success");
});

// ---------- Search and filter ----------

// Keep books that match the search text AND the selected category.
function filterBooks(books) {
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  return books.filter(function (book) {
    const matchesCategory = category === "" || textOr(book.category, "") === category;
    const searchable = [book.id, book.name, book.author].map(function (v) {
      return String(v === undefined || v === null ? "" : v).toLowerCase();
    });
    const matchesSearch = query === "" || searchable.some(function (text) { return text.includes(query); });
    return matchesCategory && matchesSearch;
  });
}

// Fill the category filter with the categories that exist in the saved books.
function refreshCategoryFilter(books) {
  const selected = categoryFilter.value;
  const categories = [];
  books.forEach(function (book) {
    const category = textOr(book.category, "");
    if (category !== "" && categories.indexOf(category) === -1) categories.push(category);
  });
  categories.sort();

  categoryFilter.replaceChildren();
  const allOption = document.createElement("option");
  allOption.value = "";
  allOption.textContent = "All categories";
  categoryFilter.appendChild(allOption);

  categories.forEach(function (category) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Keep the user's choice if it still exists
  categoryFilter.value = categories.indexOf(selected) >= 0 ? selected : "";
}

searchInput.addEventListener("input", renderBooks);
categoryFilter.addEventListener("change", renderBooks);

// ---------- Statistics ----------

function updateStatistics(books) {
  let copies = 0;
  const categories = [];

  books.forEach(function (book) {
    copies += Number(book.quantity) || 0;
    const category = textOr(book.category, "");
    if (category !== "" && categories.indexOf(category) === -1) categories.push(category);
  });

  document.getElementById("statTitles").textContent = books.length;
  document.getElementById("statCopies").textContent = copies;
  document.getElementById("statCategories").textContent = categories.length;
}

// ---------- Table ----------

// Build one text cell. textContent is safe: it never runs HTML typed by a user.
function createCell(text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  return cell;
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

function createBookRow(book) {
  const row = document.createElement("tr");
  const name = textOr(book.name, "Untitled book");

  row.appendChild(createCell(textOr(book.id, "-")));
  row.appendChild(createCell(name));
  row.appendChild(createCell(textOr(book.author, "-")));
  row.appendChild(createCell(textOr(book.category, "-")));
  row.appendChild(createCell(textOr(book.publisher, "-")));
  row.appendChild(createCell(textOr(book.year, "-")));
  row.appendChild(createCell(textOr(book.quantity, "0")));

  const actions = document.createElement("td");
  const group = document.createElement("div");
  group.className = "row-actions";
  group.appendChild(createActionButton("Edit", "btn--edit", "Edit " + name, function () { startEdit(book.id); }));
  group.appendChild(createActionButton("Delete", "btn--danger", "Delete " + name, function () { deleteBook(book.id); }));
  actions.appendChild(group);
  row.appendChild(actions);

  return row;
}

// Redraw statistics, filter list and table from what is saved right now.
function renderBooks() {
  const books = loadBooks();
  updateStatistics(books);
  refreshCategoryFilter(books);

  const visibleBooks = filterBooks(books);
  tableBody.replaceChildren();

  if (visibleBooks.length === 0) {
    const row = document.createElement("tr");
    const cell = createCell(books.length === 0
      ? "No books yet. Add your first book using the form above."
      : "No books match your search or category filter.");
    cell.colSpan = 8;
    cell.className = "table-empty";
    row.appendChild(cell);
    tableBody.appendChild(row);
  } else {
    visibleBooks.forEach(function (book) { tableBody.appendChild(createBookRow(book)); });
  }

  resultCount.textContent = books.length === 0
    ? ""
    : "Showing " + visibleBooks.length + " of " + books.length + " books";
}

// ---------- Navigation: logout and mobile menu ----------

// Clear the login flag when the user logs out (the link itself goes to the login page)
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

renderBooks();                                  // show saved books when the page opens
window.addEventListener("storage", renderBooks); // changes made in another tab