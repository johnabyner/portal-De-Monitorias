// {
//     id: 5,
//     curso: "Algoritmos 2",
//     monitor_matricula: null,
//     professor_matricula: "2010005",
//     local: "biblioteca",
//     descricao: "avise antes",
//     status: "ATIVA",
//     horarios: [...]
// }

import Auth from "./Auth.js";
import BuscarMonitorias from "./BuscarMonitorias.js";
import BuscarMonitoriasFavoritas from './BuscarMonitoriasFavoritas.js'
import { criarCardMonitoria } from "./cardMonitoria.js";

const listaMonitorias = document.querySelector(".lista-monitorias");
const botaoCriarMonitoria = document.querySelector("#btn-criar-monitoria");

if(Auth.verificarCargo() === "professor" || Auth.verificarCargo() === "administrador"){
    botaoCriarMonitoria.hidden = false;
}

botaoCriarMonitoria.addEventListener('click', ()=>{
    window.location.href = "./criarMonitoria.html";
})

//vai renderizar as monitorias
async function renderizarMonitorias() {
    try {
        const monitorias = await BuscarMonitorias.listarMonitorias();
        let favoritos = new Set();

        if(Auth.verificarCargo() !== 'visitante'){
            favoritos = await BuscarMonitoriasFavoritas.listarIdsFavoritos();
        }

        //se na busca nao vier nenhuma monitoria
        if (!monitorias?.length) {
            listaMonitorias.textContent ="Nenhuma monitoria encontrada.";
            return;
        }

        //vai adicionar os cards na pagina
        listaMonitorias.replaceChildren(
            ...monitorias.map(monitoria =>
                criarCardMonitoria({
                    ...monitoria,
                    favoritado: favoritos.has(monitoria.id)
                })
            )
        );
    } catch (erro) {
        console.error("Erro ao carregar monitorias:", erro);
        listaMonitorias.textContent ="Não foi possível carregar as monitorias.";
    }
}
renderizarMonitorias();
//se nao tiver logado nao vai buscar favoritos