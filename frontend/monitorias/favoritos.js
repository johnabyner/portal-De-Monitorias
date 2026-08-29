document.addEventListener("click", (evento) => {
    const botao = evento.target.closest(".favorito");

    if (!botao) {
        return;
    }

    botao.classList.toggle("ativo");
    botao.setAttribute("aria-pressed", botao.classList.contains("ativo"));
});
