// Classe para gerenciar o carrinho de compras
class ShoppingCart {
  constructor() {
    // Inicializa o carrinho do localStorage ou cria um novo array vazio
    this.items = JSON.parse(localStorage.getItem("cart")) || [];
    this.updateCartCount();
  }

  // Função para adicionar item ao carrinho
  addItem(product) {
    const { id, name, price, quantity = 1, volume, flavor } = product;

    // Procura se o item já existe no carrinho
    const existingItem = this.items.find(
      (item) =>
        item.id === id && item.volume === volume && item.flavor === flavor
    );

    if (existingItem) {
      // Se existir, aumenta a quantidade
      existingItem.quantity += quantity;
    } else {
      // Se não existir, adiciona novo item
      this.items.push({
        id,
        name,
        price,
        quantity,
        volume,
        flavor,
      });
    }

    // Salva no localStorage e atualiza o contador
    this.saveCart();
    this.updateCartCount();
  }

  // Remove um item do carrinho
  removeItem(id, volume, flavor) {
    this.items = this.items.filter(
      (item) =>
        !(item.id === id && item.volume === volume && item.flavor === flavor)
    );
    this.saveCart();
    this.updateCartCount();
  }

  // Atualiza a quantidade de um item
  updateQuantity(id, volume, flavor, newQuantity) {
    const item = this.items.find(
      (item) =>
        item.id === id && item.volume === volume && item.flavor === flavor
    );

    if (item) {
      if (newQuantity <= 0) {
        this.removeItem(id, volume, flavor);
      } else {
        item.quantity = newQuantity;
        this.saveCart();
        this.updateCartCount();
      }
    }
  }

  // Limpa o carrinho
  clearCart() {
    this.items = [];
    this.saveCart();
    this.updateCartCount();
  }

  // Salva o carrinho no localStorage
  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.items));
  }

  // Calcula o total do carrinho
  getTotal() {
    return this.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  // Retorna número total de itens no carrinho
  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // Atualiza o contador visual do carrinho
  updateCartCount() {
    const cartCountElement = document.querySelector(".cart-count");
    if (cartCountElement) {
      cartCountElement.textContent = this.getTotalItems();
      // Mostra ou esconde o contador baseado se há itens
      cartCountElement.style.display =
        this.getTotalItems() > 0 ? "flex" : "none";
    }
  }
}

// Função auxiliar para formatar preços
function formatPrice(price) {
  return `€${price.toFixed(2)} EUR`;
}

// Inicializa o carrinho
const cart = new ShoppingCart();

// Função para adicionar produto ao carrinho (chamada pelo botão)
function addToCart(productId, name, price, volume, flavor) {
  const quantityInput = document.getElementById("quantity");
  const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

  cart.addItem({
    id: productId,
    name: name,
    price: parseFloat(price),
    quantity: quantity,
    volume: volume,
    flavor: flavor,
  });

  // Feedback visual
  const addButton = document.querySelector(`[data-product-id="${productId}"]`);
  if (addButton) {
    const originalText = addButton.textContent;
    addButton.textContent = "Adicionado!";
    addButton.disabled = true;

    setTimeout(() => {
      addButton.textContent = originalText;
      addButton.disabled = false;
    }, 2000);
  }
}

// Atualiza o contador do carrinho quando a página carrega
document.addEventListener("DOMContentLoaded", () => {
  cart.updateCartCount();
});
