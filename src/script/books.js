/* Identificação do usuário */
/* ------------------------ */

let usuarioId = localStorage.getItem("usuarioId");

if (!usuarioId) {
  usuarioId = crypto.randomUUID();
  localStorage.setItem("usuarioId", usuarioId);
}

/* Lista de Livros */
/* --------------- */

let livros = JSON.parse(localStorage.getItem("livros")) || [];

let idLivroSendoEditado = null;

/* Selecionando os Elementos no HTML */
/* --------------------------------- */

const listaLivros = document.getElementById("lista-livros");
const listaDoacoes = document.getElementById("lista-doacoes");
const form = document.getElementById("form-doacao");
const modal = document.getElementById("modal-doacao");
const btnDoar = document.getElementById("btn-doar-livro");
const btnFechar = document.getElementById("fechar-modal");
const campoPesquisa = document.getElementById("pesquisa-livro");

console.log("listaLivros:", listaLivros);
console.log("listaDoacoes:", listaDoacoes);
console.log("form:", form);
console.log("modal:", modal);
console.log("btnDoar:", btnDoar);
console.log("btnFechar:", btnFechar);
console.log("campoPesquisa:", campoPesquisa);

/* Modal */
/* ----- */

btnDoar.addEventListener("click", () => {
  idLivroSendoEditado = null;
  form.reset();
  modal.classList.add("ativo");
});

btnFechar.addEventListener("click", () => {
  modal.classList.remove("ativo");
});

/* Salvar */
/* ------ */

function salvarLivros() {
  localStorage.setItem("livros", JSON.stringify(livros));
}

/* Criar Card */
/* ---------- */

function criarCard(livro, minhasDoacoes = false) {
  const card = document.createElement("div");

  card.classList.add("book-card");

  card.innerHTML = `
    <div class="book-image-wrapper">

      <img
        src="${livro.imagem}"
        alt="${livro.titulo}"
      >

      <span class="book-status">
        ${livro.status === "disponivel" ? "Disponível" : "Indisponível"}
      </span>

    </div>

    <div class="book-info">

      <span class="book-category">
        Livro
      </span>

      <h3>
        ${livro.titulo}
      </h3>

      <p class="book-author">
        ${livro.autor}
      </p>

      <div class="book-meta">

        <span>
          📚 Comunidade
        </span>

        <span>
          ⭐ 4.8
        </span>

      </div>

      <div class="book-actions">

        ${
          minhasDoacoes
            ? `
              <button
                type="button"
                class="btn-editar"
                data-id="${livro.id}"
              >
                Editar
              </button>

              <button
                type="button"
                class="btn-excluir"
                data-id="${livro.id}"
              >
                Excluir
              </button>
            `
            : `
              ${
                livro.status === "indisponivel"
                  ? `
                  <button
                    class="btn-emprestar"
                    disabled
                  >
                    Indisponível
                  </button>
                `
                  : reservas.some((r) => r.id === livro.id)
                    ? `
                  <button
                    class="btn-cancelar"
                    data-id="${livro.id}"
                  >
                    Cancelar
                  </button>
                `
                    : `
                  <button
                    class="btn-emprestar"
                    data-id="${livro.id}"
                  >
                    Pegar Emprestado
                  </button>
                `
              }
            `
        }

      </div>

    </div>
  `;

  return card;
}

/* Renderizar Livros */
/* ----------------- */

function renderizarLivros(filtro = "") {
  listaLivros.innerHTML = "";
  listaDoacoes.innerHTML = "";

  livros
    .filter((livro) =>
      livro.titulo.toLowerCase().includes(filtro.toLowerCase()),
    )
    .forEach((livro) => {
      listaLivros.appendChild(criarCard(livro));

      if (livro.doadorId === usuarioId) {
        listaDoacoes.appendChild(criarCard(livro, true));
      }
    });
}

/* Delegação de Eventos */
/* -------------------- */

document.addEventListener("click", (e) => {
  
  /* Excluir */

  if (e.target.classList.contains("btn-excluir")) {
    const id = Number(e.target.dataset.id);

    livros = livros.filter((livro) => livro.id !== id);

    salvarLivros();
    renderizarLivros();

    return;
  }

  /* Editar */

  if (e.target.classList.contains("btn-editar")) {
    const id = Number(e.target.dataset.id);

    const livro = livros.find((l) => l.id === id);

    if (!livro) return;

    document.getElementById("titulo").value = livro.titulo;
    document.getElementById("autor").value = livro.autor;
    document.getElementById("imagem").value = livro.imagem;

    idLivroSendoEditado = id;

    modal.classList.add("ativo");
  }
});

/* Cadastro e Edição */
/* ----------------- */

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const autor = document.getElementById("autor").value;

  const imagem =
    document.getElementById("imagem").value || "https://picsum.photos/300/400";

  if (idLivroSendoEditado !== null) {
    livros = livros.map((livro) => {
      if (livro.id === idLivroSendoEditado) {
        return {
          ...livro,
          titulo,
          autor,
          imagem,
        };
      }

      return livro;
    });

    idLivroSendoEditado = null;
  } else {
    const novoLivro = {
      id: Date.now(),
      titulo,
      autor,
      imagem,
      doadorId: usuarioId,
      status: "disponivel",
    };

    livros.push(novoLivro);
  }

  salvarLivros();
  renderizarLivros();

  form.reset();
  modal.classList.remove("ativo");
});

/* Livros Iniciais */
/* --------------- */

if (livros.length === 0) {
  livros = [
    {
      id: 1,
      titulo: "Clean Code",
      autor: "Robert C. Martin",
      imagem: "https://picsum.photos/300/400",
      doadorId: "sistema",
      status: "disponivel",
    },
    {
      id: 2,
      titulo: "O Codificador Limpo",
      autor: "Robert C. Martin",
      imagem: "https://picsum.photos/301/400",
      doadorId: "sistema",
      status: "disponivel",
    },
    {
      id: 3,
      titulo: "Arquitetura Limpa",
      autor: "Robert C. Martin",
      imagem: "https://picsum.photos/302/400",
      doadorId: "sistema",
      status: "disponivel",
    },
  ];

  salvarLivros();
}

/* Pesquisa */
/* -------- */

campoPesquisa.addEventListener("input", (e) => {
  renderizarLivros(e.target.value);
});

/* Inicialização */
/* ------------- */

renderizarLivros();

document.addEventListener("click", (e) => {
  console.log("Elemento clicado:", e.target);
});
