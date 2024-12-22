// Função para renderizar o carrinho
function renderCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const emptyCartView = document.getElementById("empty-cart-view");
  const cartItemsView = document.getElementById("cart-items-view");
  const cartItemsList = document.getElementById("cart-items-list");
  const template = document.getElementById("cart-item-template");

  // Mostra a view apropriada baseada se há itens no carrinho
  if (cartItems.length === 0) {
    emptyCartView.classList.remove("hidden");
    cartItemsView.classList.add("hidden");
    return;
  }

  // Mostra a view com itens
  emptyCartView.classList.add("hidden");
  cartItemsView.classList.remove("hidden");

  // Limpa a lista atual
  cartItemsList.innerHTML = "";

  // Adiciona cada item do carrinho
  cartItems.forEach((item) => {
    const clone = template.content.cloneNode(true);

    // Define a imagem e texto alt
    const img = clone.querySelector("img");
    function normalizeImageName(flavor) {
      return flavor
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove acentos
        .replace(/[- ]/g, "_") // Substitui espaços e hífens por underscore
        .toLowerCase(); // Converte para minúsculas
    }

    img.src = `Assests/${normalizeImageName(item.flavor)}_${item.volume}.png`;
    img.alt = item.name;

    // Define o nome do produto
    clone.querySelector("h3").textContent = item.name;

    // Define volume e sabor
    clone.querySelector(".volume").textContent = item.volume;
    clone.querySelector(".flavor").textContent = item.flavor;

    // Define o preço unitário
    clone.querySelector(".price").textContent = formatPrice(item.price);

    // Define a quantidade
    const quantityInput = clone.querySelector('input[type="number"]');
    quantityInput.value = item.quantity;

    // Define o preço total do item
    clone.querySelector(".item-total").textContent = formatPrice(
      item.price * item.quantity
    );

    // Adiciona data attributes para identificar o item
    const cartItemDiv = clone.querySelector(".cart-item");
    cartItemDiv.dataset.id = item.id;
    cartItemDiv.dataset.volume = item.volume;
    cartItemDiv.dataset.flavor = item.flavor;

    // Adiciona o item à lista
    cartItemsList.appendChild(clone);
  });

  // Atualiza os totais
  updateCartTotals(cartItems);
}

// Função para atualizar os totais do carrinho
function updateCartTotals(cartItems) {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  document.getElementById("cart-subtotal").textContent = formatPrice(subtotal);
  document.getElementById("cart-total").textContent = formatPrice(subtotal);
}

// Função para incrementar quantidade
function incrementQuantity(button) {
  const cartItem = button.closest(".cart-item");
  const input = button.previousElementSibling;
  const currentValue = parseInt(input.value);
  const newValue = currentValue + 1;
  input.value = newValue;

  // Atualiza o carrinho
  const cart = new ShoppingCart();
  cart.updateQuantity(
    cartItem.dataset.id,
    cartItem.dataset.volume,
    cartItem.dataset.flavor,
    newValue
  );

  // Atualiza a visualização
  renderCart();
}

// Função para decrementar quantidade
function decrementQuantity(button) {
  const cartItem = button.closest(".cart-item");
  const input = button.nextElementSibling;
  const currentValue = parseInt(input.value);
  if (currentValue > 1) {
    const newValue = currentValue - 1;
    input.value = newValue;

    // Atualiza o carrinho
    const cart = new ShoppingCart();
    cart.updateQuantity(
      cartItem.dataset.id,
      cartItem.dataset.volume,
      cartItem.dataset.flavor,
      newValue
    );

    // Atualiza a visualização
    renderCart();
  }
}

// Função para remover item do carrinho
function removeFromCart(button) {
  const cartItem = button.closest(".cart-item");
  const cart = new ShoppingCart();

  // Remove do carrinho usando a classe ShoppingCart
  cart.removeItem(
    cartItem.dataset.id,
    cartItem.dataset.volume,
    cartItem.dataset.flavor
  );

  // Renderiza o carrinho novamente
  renderCart();
}

// Função para prosseguir para o checkout
function proceedToCheckout() {
  // Implementar lógica de checkout
  alert("Implementar checkout");
}

// Renderiza o carrinho quando a página carrega
document.addEventListener("DOMContentLoaded", renderCart);
