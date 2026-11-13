// register/regi.js
// NOTE: This prototype keeps ONE account in LocalStorage with a plaintext password.
// That is for learning only. It is NOT secure and NOT a real multi-user system.

const USER_KEY = "user";          // same key login.js reads
const LOGIN_FLAG = "isLoggedIn";
const LOGIN_URL = "../login/login.html";

// Validation patterns
const NAME_PATTERN = /^[A-Za-z][A-Za-z .'-]*$/;   // letters, spaces, . ' -
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[6-9]\d{9}$/;             // 10 digits, first digit 6-9
const HAS_LETTER = /[A-Za-z]/;
const HAS_NUMBER = /[0-9]/;

// Elements (all IDs exist in regi.html)
const form = document.getElementById("registerForm");
const nameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phonenumber");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");
const formMessage = document.getElementById("formMessage");
const submitBtn = document.getElementById("submitBtn");
const submitText = document.getElementById("submitText");

// Each field paired with its error element
const fields = [
  { input: nameInput, error: document.getElementById("nameError") },
  { input: emailInput, error: document.getElementById("emailError") },
  { input: phoneInput, error: document.getElementById("phoneError") },
  { input: passwordInput, error: document.getElementById("passwordError") },
  { input: confirmInput, error: document.getElementById("confirmError") }
];

let isSubmitting = false;

// ---------- Helpers ----------

function setError(field, message) {
  field.error.textContent = message;
  field.input.setAttribute("aria-invalid", "true");
}

function clearField(field) {
  field.error.textContent = "";
  field.input.removeAttribute("aria-invalid");
}

function clearAll() {
  fields.forEach(clearField);
  formMessage.textContent = "";
  formMessage.className = "form-message";
}

function showFormMessage(text, type) {
  formMessage.className = "form-message form-message--" + type;
  formMessage.textContent = text;
}

function setSubmitting(state) {
  isSubmitting = state;
  submitBtn.disabled = state;
  submitText.textContent = state ? "Creating account..." : "Create account";
}

// Read the saved account safely. Returns null if missing or invalid JSON.
function getSavedUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    const user = JSON.parse(raw);
    return user && typeof user.email === "string" ? user : null;
  } catch (error) {
    return null;
  }
}

// ---------- Live helpers ----------

// Keep only digits in the phone field (handles typing and pasting)
phoneInput.addEventListener("input", function () {
  phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);
});

// Remove a field's error as soon as the user edits it
fields.forEach(function (field) {
  field.input.addEventListener("input", function () {
    clearField(field);
  });
});

// ---------- Show / Hide password (works independently per button) ----------

document.querySelectorAll(".toggle-password").forEach(function (button) {
  button.addEventListener("click", function () {
    const target = document.getElementById(button.dataset.target);
    if (!target) return;                       // safe if data-target is wrong
    const isHidden = target.type === "password";
    target.type = isHidden ? "text" : "password";
    button.textContent = isHidden ? "Hide" : "Show";
    const label = button.dataset.target === "confirmPassword" ? "confirm password" : "password";
    button.setAttribute("aria-label", (isHidden ? "Hide " : "Show ") + label);
  });
});

// ---------- Validation (returns data if valid, otherwise null) ----------

function validateForm() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();
  const phone = phoneInput.value;
  const password = passwordInput.value;          // never trimmed: spaces may be intentional
  const confirm = confirmInput.value;
  const [fName, fEmail, fPhone, fPass, fConfirm] = fields;
  let valid = true;

  // Full name
  if (name === "") { setError(fName, "Please enter your full name."); valid = false; }
  else if (name.length < 2) { setError(fName, "Name must be at least 2 characters."); valid = false; }
  else if (name.length > 30) { setError(fName, "Name must be 30 characters or fewer."); valid = false; }
  else if (!NAME_PATTERN.test(name)) {
    setError(fName, "Use only letters, spaces, periods, apostrophes and hyphens.");
    valid = false;
  }

  // Email
  if (email === "") { setError(fEmail, "Please enter your email address."); valid = false; }
  else if (!EMAIL_PATTERN.test(email)) { setError(fEmail, "Enter a valid email, like name@example.com."); valid = false; }
  else if (email.length > 30) { setError(fEmail, "Email must be 30 characters or fewer."); valid = false; }
  else {
    const saved = getSavedUser();
    if (saved && saved.email.trim().toLowerCase() === email) {
      setError(fEmail, "This email is already registered. Please sign in instead.");
      valid = false;
    }
  }

  // Phone
  if (phone === "") { setError(fPhone, "Please enter your phone number."); valid = false; }
  else if (phone.length !== 10) { setError(fPhone, "Phone number must be exactly 10 digits."); valid = false; }
  else if (!PHONE_PATTERN.test(phone)) { setError(fPhone, "Mobile number must start with 6, 7, 8 or 9."); valid = false; }

  // Password
  if (password === "") { setError(fPass, "Please enter a password."); valid = false; }
  else if (password.length < 8) { setError(fPass, "Password must be at least 8 characters."); valid = false; }
  else if (password.length > 64) { setError(fPass, "Password must be 64 characters or fewer."); valid = false; }
  else if (!HAS_LETTER.test(password) || !HAS_NUMBER.test(password)) {
    setError(fPass, "Password must include at least one letter and one number.");
    valid = false;
  }

  // Confirm password
  if (confirm === "") { setError(fConfirm, "Please confirm your password."); valid = false; }
  else if (confirm !== password) { setError(fConfirm, "Passwords do not match."); valid = false; }

  return valid ? { username: name, email: email, phonenumber: phone, password: password } : null;
}

// ---------- Submit ----------

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (isSubmitting) return;
  clearAll();

  const user = validateForm();

  if (!user) {
    showFormMessage("Please fix the highlighted fields and try again.", "error");
    const firstInvalid = fields.find(function (f) { return f.input.getAttribute("aria-invalid") === "true"; });
    if (firstInvalid) firstInvalid.input.focus();
    return;
  }

  setSubmitting(true);

  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.removeItem(LOGIN_FLAG);        // new account: start logged out
  } catch (error) {
    showFormMessage("Could not save your account. Check that browser storage is enabled and try again.", "error");
    setSubmitting(false);
    return;
  }

  showFormMessage("Registration successful. Redirecting to sign in...", "success");
  setTimeout(function () {
    window.location.href = LOGIN_URL;
  }, 1200);
});