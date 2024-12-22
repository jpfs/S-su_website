// Gerenciamento da seleção de sabor
function initFlavorSelection() {
  const flavorButtons = document.querySelectorAll("[data-flavor]");

  // Seleciona o primeiro sabor por padrão
  if (flavorButtons.length > 0) {
    flavorButtons[0].classList.add("bg-[#3C4E37]", "text-white");
  }

  flavorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove seleção dos outros botões
      flavorButtons.forEach((btn) => {
        btn.classList.remove("bg-[#3C4E37]", "text-white");
        btn.classList.add("hover:bg-gray-50");
      });

      // Adiciona seleção ao botão clicado
      button.classList.add("bg-[#3C4E37]", "text-white");
      button.classList.remove("hover:bg-gray-50");
    });
  });
}

// Função para pegar o sabor selecionado
function getSelectedFlavor() {
  const selectedButton = document.querySelector(
    "[data-flavor].bg-\\[\\#3C4E37\\]"
  );
  return selectedButton ? selectedButton.dataset.flavor : "";
}

// Atualiza o addToCart para usar o sabor selecionado
function addToCartWithFlavor(productId, name, price, volume) {
  const flavor = getSelectedFlavor();
  if (!flavor) {
    alert("Por favor, selecione um sabor");
    return;
  }

  addToCart(productId, name, price, volume, flavor);
}

// Inicializa a seleção de sabor quando a página carregar
document.addEventListener("DOMContentLoaded", initFlavorSelection);
