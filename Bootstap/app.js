document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".qty-control").forEach((control) => {
    const input = control.querySelector("input");
    const buttons = control.querySelectorAll("button");

    if (!input || buttons.length < 2) return;

    input.type = "number";
    input.min = "1";

    buttons[0].addEventListener("click", () => {
      input.value = Math.max(1, Number(input.value || 1) - 1);
    });

    buttons[1].addEventListener("click", () => {
      input.value = Number(input.value || 1) + 1;
    });
  });

  document.querySelectorAll(".cart-item .btn-danger").forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".cart-item")?.remove();
    });
  });

  document.querySelectorAll('form[role="search"]').forEach((form) => {
    form.addEventListener("submit", (event) => {
      const input = form.querySelector('input[type="search"]');
      if (!input || input.value.trim() === "") {
        event.preventDefault();
      }
    });
  });

  document.querySelectorAll(".fa-cart-shopping, .btn-primary").forEach((button) => {
    const text = button.textContent.trim().toLowerCase();
    const isCartButton = button.classList.contains("fa-cart-shopping") || text === "add to cart";

    if (!isCartButton) return;

    button.addEventListener("click", () => {
      const cartList = document.querySelector(".cart-item-list");
      if (!cartList) return;

      const product = button.closest(".product, .modal-body, .card");
      const name = product?.querySelector("h4, h5")?.textContent.trim() || "Product";
      const price = product?.querySelector(".badge.bg-success")?.textContent.trim() || "0$";
      const image = product?.querySelector("img")?.getAttribute("src") || "";

      const item = document.createElement("div");
      item.className = "cart-item d-flex justify-content-between align-items-center mb-2";
      item.innerHTML = `
        <img style="width: 70px;" src="${image}" alt="">
        <p><span class="badge bg-success">${price}</span></p>
        <p>${name}</p>
        <button class="btn btn-sm btn-danger">Remove</button>
      `;

      item.querySelector(".btn-danger").addEventListener("click", () => item.remove());
      cartList.appendChild(item);
    });
  });
});
