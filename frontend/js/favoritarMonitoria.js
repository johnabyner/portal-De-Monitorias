import Auth from "./Auth.js";
import BuscarMonitoriasFavoritas from "./BuscarMonitoriasFavoritas.js";

document.addEventListener("click", async (evento) => { //quando for clicado vai entrar aqui
    const botao = evento.target.closest(".favorito");
    if (!botao) { //se o botao nao for do tipo q tem a classe favorito vai retornar
        return;
    }

    //se for um visitante
    if(Auth.verificarCargo() === 'visitante'){
        window.location.href = "../login/login.html";
        return;
    }
    
    const card = botao.closest('.card-monitoria');
    const id = card.dataset.id;

    try {
        if (botao.classList.contains("ativo")) {
            const resposta = await BuscarMonitoriasFavoritas.deletarMonitoriaFavorita(id);
            if (!resposta.ok) {
                throw new Error("Erro ao remover favorito");
            }

            botao.classList.remove("ativo");
        } else {
            const resposta =await BuscarMonitoriasFavoritas.cadastrarMonitoriaFavorita(id);
            if (!resposta.ok) {
                throw new Error("Erro ao adicionar favorito");
            }

            botao.classList.add("ativo");
        }

        botao.setAttribute("aria-pressed", botao.classList.contains("ativo"));
    }catch (erro) {
        console.error("Erro ao alterar favorito:", erro);
    }
});

