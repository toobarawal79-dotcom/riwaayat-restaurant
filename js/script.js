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


// RIWAAYAT online ordering
const WHATSAPP_NUMBER = "923097596731";
const cart = [];
const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");
const cartCount = document.querySelector("#cartCount");
const orderForm = document.querySelector("#orderForm");
const orderType = document.querySelector("#orderType");
const addressWrap = document.querySelector("#addressWrap");

function renderCart() {
  if (!cart.length) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty. Add a dish from the menu above.</p>';
  } else {
    cartItems.innerHTML = cart.map((item, index) => `
      <div class="cart-row">
        <div><strong>${item.name}</strong><small>Rs. ${item.price.toLocaleString()}</small></div>
        <div class="qty"><button type="button" data-minus="${index}" aria-label="Remove one">−</button><span>${item.qty}</span><button type="button" data-plus="${index}" aria-label="Add one">+</button></div>
      </div>
    `).join("");
  }
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  cartTotal.textContent = `Rs. ${total.toLocaleString()}`;
  cartCount.textContent = `${count} ${count === 1 ? "item" : "items"}`;
}

document.querySelectorAll(".add-order").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.item;
    const price = Number(button.dataset.price);
    const found = cart.find(item => item.name === name);
    if (found) found.qty += 1;
    else cart.push({name, price, qty: 1});
    renderCart();
    document.querySelector("#order")?.scrollIntoView({behavior:"smooth", block:"start"});
  });
});

cartItems?.addEventListener("click", (event) => {
  const plus = event.target.closest("[data-plus]");
  const minus = event.target.closest("[data-minus]");
  if (plus) cart[Number(plus.dataset.plus)].qty += 1;
  if (minus) {
    const item = cart[Number(minus.dataset.minus)];
    item.qty -= 1;
    if (item.qty <= 0) cart.splice(Number(minus.dataset.minus), 1);
  }
  renderCart();
});

function updateAddressState() {
  const delivery = orderType?.value === "Delivery";
  addressWrap.style.display = delivery ? "block" : "none";
  addressWrap.querySelector("textarea").required = delivery;
}
orderType?.addEventListener("change", updateAddressState);
updateAddressState();

orderForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!cart.length) {
    document.querySelector("#orderMessage").textContent = "Please add at least one dish to your order.";
    return;
  }
  const data = new FormData(orderForm);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const items = cart.map(item => `${item.name} x${item.qty} — Rs. ${(item.price * item.qty).toLocaleString()}`).join("\n");
  const message = `Hello RIWAAYAT! I would like to place an order.\n\nCustomer: ${data.get("customer")}\nPhone: ${data.get("phone")}\nOrder type: ${data.get("orderType")}\n${data.get("orderType") === "Delivery" ? `Address: ${data.get("address")}\n` : ""}Notes: ${data.get("notes") || "None"}\n\nOrder:\n${items}\n\nTotal: Rs. ${total.toLocaleString()}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  document.querySelector("#orderMessage").textContent = "Your WhatsApp order message has been prepared. Please send it in WhatsApp to confirm.";
});

document.querySelector("#whatsappOrderLink")?.addEventListener("click", (event) => {
  if (!cart.length) {
    event.preventDefault();
    document.querySelector("#order")?.scrollIntoView({behavior:"smooth"});
    document.querySelector("#orderMessage").textContent = "Add your dishes first, then use the WhatsApp order button.";
  }
});

// Contact form: opens the visitor's email app with the message.
document.querySelector("#contactForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = `RIWAAYAT Website Contact — ${data.get("name")}`;
  const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\nMessage:\n${data.get("message")}`;
  window.location.href = `mailto:hello@riwaayat.example?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.querySelector("#contactMessage").textContent = "Your email app is opening. Send the prepared message to contact RIWAAYAT.";
});
