let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

/* ADICIONAR RESERVA E CANCELAR */
/* ============================ */

document.addEventListener("click", (e) => {
  /* Adicionar */

  if (e.target.classList.contains("btn-emprestar")) {
    const id = Number(e.target.dataset.id);

    const livro = livros.find((l) => l.id === id);

    if (!livro) return;

    if (!reservas.some((r) => r.id === id)) {
      reservas.push(livro);
    }

    localStorage.setItem("reservas", JSON.stringify(reservas));

    atualizarContador();
    renderizarReservas();
    renderizarLivros();

    return;
  }

  /* Cancelar */

  if (e.target.classList.contains("btn-cancelar")) {
    const id = Number(e.target.dataset.id);

    reservas = reservas.filter((r) => r.id !== id);

    localStorage.setItem("reservas", JSON.stringify(reservas));

    atualizarContador();
    renderizarReservas();
    renderizarLivros();
  }
});

/* ATUALIZAR CONTADOR */
/* ================== */

function atualizarContador() {
  document.getElementById("contador-reservas").textContent = reservas.length;
}

/* ABRIR SIDE BAR */
/* ============== */

const sidebar = document.getElementById("sidebar-reservas");

document.getElementById("btn-reservas").addEventListener("click", () => {
  renderizarReservas();

  sidebar.classList.add("ativo");
});

/* MOSTRAR LIVROS RESERVADOS */
/* ========================= */

function renderizarReservas() {
  const lista = document.getElementById("lista-reservas");

  lista.innerHTML = "";

  reservas.forEach((livro) => {
    lista.innerHTML += `
      <div class="item-reserva">

        <strong>
          ${livro.titulo}
        </strong>

        <p>
          ${livro.autor}
        </p>

      </div>
    `;
  });
}

/* CONFIRMAR RESERVA */
/* ================= */

document.getElementById("confirmar-reserva").addEventListener("click", () => {
  const overlay = document.getElementById("overlay-sidebar");

  livros.forEach((livro) => {
    if (reservas.some((r) => r.id === livro.id)) {
      livro.status = "indisponivel";
    }
  });

  salvarLivros();

  reservas = [];

  localStorage.setItem("reservas", JSON.stringify(reservas));

  atualizarContador();
  renderizarReservas();
  renderizarLivros();

  overlay.classList.remove("ativo");
  sidebar.classList.remove("ativo");
});

/* SIDE BAR */
/* ======== */

const overlay = document.getElementById("overlay-sidebar");

document.getElementById("btn-reservas").addEventListener("click", () => {
  renderizarReservas();

  sidebar.classList.add("ativo");
  overlay.classList.add("ativo");
});

document.getElementById("fechar-sidebar").addEventListener("click", () => {
  sidebar.classList.remove("ativo");
  overlay.classList.remove("ativo");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("ativo");
  overlay.classList.remove("ativo");
});

sidebar.classList.remove("ativo");
overlay.classList.remove("ativo");

atualizarContador();

renderizarLivros();
renderizarReservas();

sidebar.classList.remove("ativo");
