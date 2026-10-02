const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const topButton = document.querySelector(".to-top");
const form = document.querySelector("#reservationForm");
const dateInput = document.querySelector('input[name="date"]');

toggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  topButton.classList.toggle("show", window.scrollY > 600);
});

topButton.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));

if (dateInput) {
  const today = new Date();
  const local = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
  dateInput.min = local.toISOString().split("T")[0];
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const message = form.querySelector(".form-message");
  const name = data.get("name");
  message.textContent = `Thanks, ${name}! Your reservation request has been received. The restaurant team will contact you to confirm.`;
  form.reset();
  if (dateInput) {
    const today = new Date();
    const local = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
    dateInput.min = local.toISOString().split("T")[0];
  }
});
