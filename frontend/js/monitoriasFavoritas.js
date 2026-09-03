import Auth from "./Auth.js";
import BuscarMonitoriasFavoritas from "./BuscarMonitoriasFavoritas.js";
import { criarCardMonitoria } from "./cardMonitoria.js";

const listaMonitorias = document.querySelector(".lista-monitorias");

//renderizando nosso card
async function renderizarMonitorias(page = 0){
    try{
        if(Auth.verificarCargo() === 'visitante'){
            listaMonitorias.textContent = "Funcionalidade apenas para usuarios cadastrados";
            return;
        }

        const monitorias = await BuscarMonitoriasFavoritas.listarMonitoriasFavoritas(page);
        if(!monitorias?.length){
            listaMonitorias.textContent = "Sem Monitorias favoritadas, tente clicar na estrela";
            return;
        }

        listaMonitorias.replaceChildren(
            ...monitorias.map(monitoria =>
                criarCardMonitoria({
                    ...monitoria,
                    favoritado:true
                })
            )
        );
    }catch(err){
        console.error("erro em carregar monitorias favoritas", err);
        listaMonitorias.textContent = "Nao foi possivel carregar suas monitorias favoritas"
    }
}
renderizarMonitorias();
//se nao tiver logado vai aparecer outra pagina