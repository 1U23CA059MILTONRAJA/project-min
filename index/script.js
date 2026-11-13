// Mobile navigation: open/close the menu
const toggle = document.getElementById("menuToggle");
const menu = document.getElementById("navMenu");

function setMenu(open) {
  menu.classList.toggle("is-open", open);
  toggle.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

toggle.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));

// Close the menu after a link is clicked
menu.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => setMenu(false))
);