let ultimoScroll = 0;

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  const scrollAtual = window.pageYOffset;

  if (scrollAtual > ultimoScroll && scrollAtual > 150) {
    header.classList.add("header-hidden");
  } else {
    header.classList.remove("header-hidden");
  }

  ultimoScroll = scrollAtual;
});
