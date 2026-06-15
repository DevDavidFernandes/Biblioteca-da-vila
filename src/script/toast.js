const formularioContato = document.querySelector(".contact-form");

const toast = document.getElementById("toast");

formularioContato.addEventListener("submit", (e) => {
  e.preventDefault();

  toast.classList.add("show");

  formularioContato.reset();

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
});
