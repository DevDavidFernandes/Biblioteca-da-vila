// 1. Seleciona todos os botões
const botoes = document.querySelectorAll(".accordion-header");

// 2. Passa por cada botão
botoes.forEach((botao) => {
  // 3. Escuta o clique
  botao.addEventListener("click", () => {
    // Pega o elemento pai do botão clicado
    const itemPai = botao.parentNode;

    // Verifica se o item clicado já está ativo
    const jaEstaAtivo = itemPai.classList.contains("active");

    // 4. Procura por QUALQUER item que esteja aberto atualmente
    const itemAberto = document.querySelector(".accordion-item.active");

    // Se existir um item aberto, nós fechamos ele
    if (itemAberto) {
      itemAberto.classList.remove("active");
    }

    // 5. Se o item clicado NÃO estava ativo antes, agora nós abrimos ele
    if (!jaEstaAtivo) {
      itemPai.classList.add("active");
    }
  });
});
