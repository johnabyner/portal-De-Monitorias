import Auth from "./Auth.js";
import BuscarMonitorias from "./BuscarMonitorias.js";
import BuscarHorarios from "./BuscarHorarios.js";
import BuscarDisciplinas from "./BuscarDisciplinas.js";
import { validarCampo, validarFormulario, limparValidacoes } from "./validacaoFormulario.js";
import { obterHorarios } from "./horariosMonitoria.js";

const cargo = Auth.verificarCargo();

if (!["professor", "monitor", "administrador"].includes(cargo)) {
    window.location.href = "./monitorias.html";
    throw new Error("Acesso não autorizado.");
}

//FORMULARIO
const formulario = document.querySelector(".formulario-monitoria");
const mensagemMonitoria = document.querySelector("#mensagem-monitoria");
//CAMPOS
const inputMonitor = document.querySelector("#monitor");
const inputNome = document.querySelector("#nome");
const inputDisciplina = document.querySelector("#disciplina");
const inputDisciplinaId = document.querySelector("#disciplina_id");
const inputLocal = document.querySelector("#local");
const inputDescricao = document.querySelector("#descricao");
const sugestoesDisciplinas = document.querySelector("#sugestoes-disciplinas");

//ID VEM NA URL
const id = new URLSearchParams(window.location.search).get("id");
if (!id || Number.isNaN(Number(id))) {
        mostrarMensagem("ID da monitoria inválido.", false);
        throw new Error("ID da monitoria inválido.");
}

let disciplinas = [];
let monitoriaAtual = null;
let horariosAtuais = [];

const DIAS = ["segunda", "terca", "quarta", "quinta", "sexta"];
//Esse código faz validação automática dos campos enquanto o usuário digita.
formulario.addEventListener("input", event => {
    const campo = event.target;
    //qualquer <input>, exceto radio
    //qulquer select e text area
    if (campo.matches("input:not([type='radio']), select, textarea")) {
        validarCampo(campo);
    }
});
//MENSAGEM DE ERROOU SUCESSO
function mostrarMensagem(texto, sucesso) {
    mensagemMonitoria.textContent = texto;
    mensagemMonitoria.classList.remove(
        "mensagemServidorSucesso",
        "mensagemServidorErro"
    );
    mensagemMonitoria.classList.add(
        sucesso ? "mensagemServidorSucesso" : "mensagemServidorErro"
    );

    if (!id || Number.isNaN(Number(id))) {
        mostrarMensagem("ID da monitoria inválido.", false);
        throw new Error("ID da monitoria inválido.");
    }
}
//MONITOR NAO PODE ACESSAR ESSES CAMPOS
function bloquearCamposDeProfessor() {
    document.querySelectorAll(".campo-professor").forEach(campo => {
        campo.style.display = cargo === "monitor" ? "none" : "";
    });

    if (cargo === "monitor") {
        inputMonitor.disabled = true;
        inputNome.disabled = true;
        inputDisciplina.disabled = true;
        inputDisciplinaId.disabled = true;
    }
}

function preencherHorarios(horarios) {
    for (const horario of horarios) {
        const dia = horario.dia_semana ?? horario.dia;
        if (!DIAS.includes(dia)) {
            continue;
        }

        const inicio = horario.hora_inicio ?? horario.inicio;
        const fim = horario.hora_fim ?? horario.termino;

        const inputInicio = formulario.querySelector(
            `[name="${dia}_inicio"]`
        );

        const inputFim = formulario.querySelector(
            `[name="${dia}_fim"]`
        );

        if (inputInicio) {
            inputInicio.value = String(inicio).slice(0, 5);
        }

        if (inputFim) {
            inputFim.value = String(fim).slice(0, 5);
        }
    }
}

//DISCIPLINAS
async function carregarDisciplinas() {
    const resposta = await BuscarDisciplinas.listarDisciplinas();
    if (!resposta.ok) {
        throw new Error("Não foi possível carregar as disciplinas.");
    }

    disciplinas = resposta.dados.result ?? [];
}
//AUTO COMPLETE
function configurarDisciplinas() {
    inputDisciplina.addEventListener("input", () => {
        const texto = inputDisciplina.value.trim().toLowerCase();

        inputDisciplinaId.value = "";
        sugestoesDisciplinas.replaceChildren();

        if (!texto) {
            return;
        }

        const resultados = disciplinas
            .filter(disciplina =>
                disciplina.curso.toLowerCase().includes(texto)
            )
            .slice(0, 5);

        resultados.forEach(disciplina => {
            const sugestao = document.createElement("button");

            sugestao.type = "button";
            sugestao.textContent = disciplina.curso;

            sugestao.addEventListener("click", () => {
                inputDisciplina.value = disciplina.curso;
                inputDisciplinaId.value = disciplina.id;
                sugestoesDisciplinas.replaceChildren();
            });

            sugestoesDisciplinas.appendChild(sugestao);
        });
    });
}

async function buscarMonitoria() {
    const {resposta, dados} = await BuscarMonitorias.minhasMonitorias();

    if (!resposta.ok) {
        throw new Error("Não foi possível carregar suas monitorias.");
    }

    const monitorias = dados.result ?? [];

    const monitoria = monitorias.find(
        item => Number(item.id) === Number(id)
    );

    if (!monitoria) {
        throw new Error("Monitoria não encontrada.");
    }

    return monitoria;
}

async function buscarHorarios() {
    const resposta = await BuscarHorarios.listarHorarios();

    if (!Array.isArray(resposta)) {
        return [];
    }

    return resposta
}

function preencherFormulario(monitoria) {
    monitoriaAtual = monitoria;
    console.log(monitoria)

    inputMonitor.value = monitoria.monitor_matricula ?? "";
    inputNome.value = monitoria.nome ?? "";
    inputDisciplina.value = monitoria.curso ?? "";
    inputDisciplinaId.value = monitoria.disciplina_id ?? "";
    inputLocal.value = monitoria.local ?? "";
    inputDescricao.value = monitoria.descricao ?? "";

    if (monitoria.disciplina_id) {
        const disciplina = disciplinas.find(
            item => Number(item.id) === Number(monitoria.disciplina_id)
        );

        if (disciplina) {
            inputDisciplina.value = disciplina.curso;
        }
    }

    bloquearCamposDeProfessor();
}

async function carregarPagina() {
    try {
        mostrarMensagem("Carregando monitoria...", true);

        await carregarDisciplinas();

        const [monitoria, horarios] = await Promise.all([
            buscarMonitoria(),
            buscarHorarios()
        ]);

        preencherFormulario(monitoria);

        horariosAtuais = horarios;
        preencherHorarios(horarios);

        mensagemMonitoria.textContent = "";
    } catch (erro) {
        console.error("Erro ao carregar monitoria:", erro);
        mostrarMensagem(erro.message || "Não foi possível carregar a monitoria.", false
        );
    }
}

async function atualizarMonitoria() {
    const dados = {
        local: inputLocal.value.trim(),
        descricao: inputDescricao.value.trim() || null
    };

    if (cargo !== "monitor") {
        dados.disciplina_id = Number(inputDisciplinaId.value);
        dados.monitor_matricula = inputMonitor.value.trim() || null;
        dados.nome = inputNome.value.trim();
    }

    const {resposta} = await BuscarMonitorias.editarMonitorias(dados, id);

    if (!resposta) {
        throw new Error("Não houve resposta do servidor.");
    }

    const dadosResposta = await resposta.json().catch(() => null);

    if (!resposta.ok) {
        throw new Error(
            dadosResposta.message || "Não foi possível atualizar a monitoria."
        );
    }

    return dadosResposta || {};
}

async function atualizarHorarios() {
    const novosHorarios = obterHorarios(formulario);

    const horariosPorDia = new Map(
        horariosAtuais.map(horario => [
            horario.dia_semana ?? horario.dia,
            horario
        ])
    );

    for (const novoHorario of novosHorarios) {
        const horarioExistente = horariosPorDia.get(novoHorario.dia_semana);

        if (horarioExistente?.id) {
            const resposta = await BuscarHorarios.editarHorario(
                {
                    dia_semana: novoHorario.dia_semana,
                    hora_inicio: novoHorario.hora_inicio,
                    hora_fim: novoHorario.hora_fim
                },
                horarioExistente.id
            );

            if (!resposta.ok) {
                const dados = await resposta?.json().catch(() => null);

                throw new Error(
                    dados?.message || "Erro ao atualizar horário."
                );
            }
        } else {
            const resposta = await BuscarHorarios.cadastrarHorario({
                monitoria_id: Number(id),
                dia_semana: novoHorario.dia_semana,
                hora_inicio: novoHorario.hora_inicio,
                hora_fim: novoHorario.hora_fim
            });


            if (!resposta.ok) {
                const dados = resposta?.dados;

                throw new Error(
                    dados?.message || "Erro ao cadastrar novo horário."
                );
            }
        }

        horariosPorDia.delete(novoHorario.dia_semana);
    }

    for (const horario of horariosPorDia.values()) {
        if (!horario.id) {
            throw new Error(
                "O servidor não retornou o ID de um horário existente."
            );
        }

        const resposta = await BuscarHorarios.deletarHorario(horario.id);

        if (!resposta?.ok) {
            const dados = await resposta?.json().catch(() => null);

            throw new Error(
                dados?.message || "Erro ao remover horário."
            );
        }
    }
}

formulario.addEventListener("submit", async event => {
    event.preventDefault();

    mensagemMonitoria.textContent = "";
    mensagemMonitoria.classList.remove(
        "mensagemServidorSucesso",
        "mensagemServidorErro"
    );

    if (!validarFormulario(formulario)) {
        return;
    }

    if (
        cargo !== "monitor" && !inputDisciplinaId.value
    ) {
        inputDisciplina.classList.remove("valido");
        inputDisciplina.classList.add("invalido");

        inputDisciplina
            .closest(".campo")
            .querySelector(".mensagem-erro")
            .textContent = "Selecione uma disciplina da lista.";

        return;
    }

    try {
        const resposta = await atualizarMonitoria();
        console.log(resposta)
        await atualizarHorarios();

        mostrarMensagem(
            resposta?.message || "Monitoria atualizada com sucesso!",
            true
        );

        setTimeout(() => {
            window.location.href = "./minhasMonitorias.html";
        }, 1000);
    } catch (erro) {
        console.error("Erro ao editar monitoria:", erro);

        mostrarMensagem(
            erro.message || "Erro ao atualizar monitoria.",
            false
        );
    }
});

limparValidacoes(formulario);
configurarDisciplinas();
carregarPagina();