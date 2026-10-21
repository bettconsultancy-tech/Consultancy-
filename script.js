// 1. Automatic copyright year
document.getElementById("year").textContent = new Date().getFullYear();

// 2. Mobile menu: open/close, and close after a link is tapped
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// 3. Contact form: validate, then open WhatsApp with the message pre-filled.
// No server or secret keys are needed, so nothing private is exposed.
const WHATSAPP_NUMBER = "254112813110";
const form = document.getElementById("contactForm");
const statusBox = document.getElementById("formStatus");

function showError(id, text) {
  document.getElementById(id).textContent = text;
  return text === "";
}

form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const service = form.service.value;
  const message = form.message.value.trim();

  const okName = showError("nameError", name ? "" : "Please enter your name.");
  const okEmail = showError("emailError", /^\S+@\S+\.\S+$/.test(email) ? "" : "Please enter a valid email address.");
  const okMessage = showError("messageError", message.length >= 10 ? "" : "Please write at least 10 characters.");

  if (!(okName && okEmail && okMessage)) {
    statusBox.textContent = "";
    return;
  }

  const text = `Hello Bett Consultancy, my name is ${name} (${email}). I need: ${service}. ${message}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  statusBox.textContent = "Thanks! WhatsApp is opening so you can send your message.";
  form.reset();
});

// 4. Project preview window (add new projects by adding to this list)
const projects = {
  bakery: [
    ["images/bakery-1.jpg", "Bold Bakery home page with a headline and three product categories"],
    ["images/bakery-2.jpg", "Bold Bakery order reminders and online order form"],
    ["images/bakery-3.jpg", "Bold Bakery menu of breads, desserts and pastries with prices"],
    ["images/bakery-4.jpg", "Bold Bakery customer feedback survey and contact details"]
  ],
  poster: [
    ["images/poster.jpg", "Poster inviting everyone to a Bethlehem Church conference on August 24, 2026"]
  ]
};
const dialog = document.getElementById("projectDialog");
const dialogBody = document.getElementById("dialogBody");

document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => {
    dialogBody.innerHTML = "";
    projects[button.dataset.project].forEach(([src, alt]) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = alt;
      dialogBody.appendChild(img);
    });
    dialog.showModal();
  });
});
document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); }); // click outside to close
