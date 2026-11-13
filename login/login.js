// login/login.js
// NOTE: LocalStorage with plaintext passwords is for learning only.
// It is NOT secure and must not be used in a real application.

const USER_KEY = "user";
const LOGIN_FLAG = "isLoggedIn";
const DASHBOARD_URL = "../dashboard/dash.html";
const REGISTER_URL = "../register/regi.html";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Get elements once. Every one of these IDs exists in login.html.
const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const formMessage = document.getElementById("formMessage");
const toggleBtn = document.getElementById("togglePassword");
const submitBtn = document.getElementById("submitBtn");
const submitText = document.getElementById("submitText");

let isSubmitting = false;

// ---------- Helpers ----------

function showFieldError(input, errorEl, message) {
  errorEl.textContent = message;
  input.setAttribute("aria-invalid", "true");
}

function clearErrors() {
  [[emailInput, emailError], [passwordInput, passwordError]].forEach(([input, el]) => {
    el.textContent = "";
    input.removeAttribute("aria-invalid");
  });
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
  submitText.textContent = state ? "Signing in..." : "Sign in";
}

// Read the registered account safely. Returns null if missing or invalid.
function getRegisteredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    const user = JSON.parse(raw);
    if (user && typeof user.email === "string" && typeof user.password === "string") {
      return user;
    }
    return null;
  } catch (error) {
    return null; // corrupted JSON or storage blocked
  }
}

// ---------- Show / Hide password ----------

toggleBtn.addEventListener("click", function () {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  toggleBtn.textContent = isHidden ? "Hide" : "Show";
  toggleBtn.setAttribute("aria-pressed", String(isHidden));
});

// ---------- Submit ----------

form.addEventListener("submit", function (event) {
  event.preventDefault();          // stop the page from reloading
  if (isSubmitting) return;        // ignore double clicks
  clearErrors();

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  let firstInvalid = null;

  // One message per field (if/else if keeps them from conflicting)
  if (email === "") {
    showFieldError(emailInput, emailError, "Please enter your email address.");
    firstInvalid = emailInput;
  } else if (!EMAIL_PATTERN.test(email)) {
    showFieldError(emailInput, emailError, "Enter a valid email address, like name@example.com.");
    firstInvalid = emailInput;
  }

  if (password === "") {
    showFieldError(passwordInput, passwordError, "Please enter your password.");
    firstInvalid = firstInvalid || passwordInput;
  }

  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }

  setSubmitting(true);

  try {
    const user = getRegisteredUser();

    if (!user) {
      showFormMessage("No registered account found. ", "error");
      const link = document.createElement("a");
      link.href = REGISTER_URL;
      link.textContent = "Create an account";
      formMessage.appendChild(link);
      setSubmitting(false);
      return;
    }

    const emailMatches = user.email.trim().toLowerCase() === email.toLowerCase(); // not case sensitive
    const passwordMatches = user.password === password;                          // case sensitive

    if (!emailMatches || !passwordMatches) {
      showFormMessage("Incorrect email or password. Please try again.", "error");
      passwordInput.value = "";   // email is kept
      passwordInput.focus();
      setSubmitting(false);
      return;
    }

    localStorage.setItem(LOGIN_FLAG, "true");
    showFormMessage("Login successful. Redirecting to your dashboard...", "success");
    setTimeout(function () {
      window.location.href = DASHBOARD_URL;
    }, 800);
  } catch (error) {
    showFormMessage("Something went wrong. Please try again.", "error");
    setSubmitting(false);
  }
});