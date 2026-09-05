import BuscarMonitorias from "./BuscarMonitorias.js";
import Auth from "./Auth.js";

const cargo = Auth.verificarCargo()
if(cargo === "aluno" || cargo === "visitante" || cargo === "administrador"){
        window.location.href = './monitorias.html';
    throw new Error('Acesso não autorizado.');
}

const lista = document.querySelector(".lista-monitorias");
function criarCardMonitoria(monitoria) {
    const { id, curso, nome, monitor_nome, professor_nome, local, status } = monitoria;

    let botaoTrocarStatusMonitoria = '';
    if(status === "DESATIVADA"){
        botaoTrocarStatusMonitoria = 'Ativar'
    }else{
        botaoTrocarStatusMonitoria = 'Desativar'
    }

    const card = document.createElement("article");
    card.className = "card-monitoria";
    card.dataset.id = id;
    console.log(monitoria)

    

    card.innerHTML = `
        <div class="card-header">
            <h2>${nome}</h2>
            <span class="status ${status?.toLowerCase()}">
                <span></span>${status ?? "SEM STATUS"}
            </span>
        </div>

        <div class="informacoes-monitor">
                <p>Disciplina: ${curso ?? "Não definido"}</p>
                <p>Professor: ${professor_nome ?? "Não definido"}</p>
                <p>Monitor: ${monitor_nome ?? "Não definido"}</p>
                <p>Local: ${local}</p>
        </div>

        <div class="acoes-monitoria">
            <button class="editar" type="button" id="botaoEditarMonitoria" hidden>Editar</button>
            <button class="desativar" type="button" id="botaoDesativarMonitoria" hidden>${botaoTrocarStatusMonitoria}</button>
            <button class="detalhes" type="button">Ver detalhes</button>
        </div>
    `;

    //Se for um professor ou administrador, vai poder desativar
    const botaoDesativarMonitoria = card.querySelector("#botaoDesativarMonitoria");
    if(cargo === 'professor' || cargo === 'administrador'){
        botaoDesativarMonitoria.hidden = false;
    }
    //se a monitoria estiver desativada nao vai dar para editar
    const botaoEditarMonitoria = card.querySelector("#botaoEditarMonitoria");
    if(status === 'ATIVA'){
        botaoEditarMonitoria.hidden = false;
    }

    //BUTTONS LISTENER
    card.querySelector(".editar").addEventListener("click", () => {
        window.location.href = `./editarMonitoria.html?id=${id}`;
    });

    card.querySelector(".desativar").addEventListener("click", async () => {
        let novoStatus = ""
        if(status === "ATIVA"){
            novoStatus = "DESATIVADA"
        }else{
            novoStatus = "ATIVA"
        }
        const {resposta, dados} = await BuscarMonitorias.trocarStatusMonitoria(id,novoStatus);
        if(!resposta.ok){
            console.error(dados.message)
        }

        window.location.reload();
    });

    card.querySelector(".detalhes").addEventListener("click", () => {
        window.location.href = `./detalhesMonitoria.html?id=${id}`;
    });

    return card;
}

async function carregarMinhasMonitorias() {
    try{
        const {resposta, dados} = await BuscarMonitorias.minhasMonitorias();

        if (!resposta.ok) {
            lista.innerHTML = "<p>Não foi possível carregar suas monitorias.</p>";
            return;
        }
        lista.innerHTML = "";
        
        if (!dados.result.length) {
            if(dados.message){
                lista.innerHTML = dados.message
            }else{
                lista.innerHTML = "<p>Você não possui monitorias cadastradas.</p>";
            }

            return;
        }
        dados.result.forEach(monitoria => {
            lista.appendChild(criarCardMonitoria(monitoria));
        });
    }catch (erro) {
        console.error("Erro ao carregar monitorias:", erro);
        lista.textContent ="Não foi possível carregar as monitorias.";
    }
}

carregarMinhasMonitorias();