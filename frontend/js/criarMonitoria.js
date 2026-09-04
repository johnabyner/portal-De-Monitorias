//monitor
//disciplina
//local
//descricao
//------------------------
//horarios
//dia, horario
//adicionar outro horario
//------------------------
//cancelar, criar monitoria
import BuscarMonitorias from './BuscarMonitorias.js';
import BuscarHorarios from './BuscarHorarios.js'
import BuscarDisciplinas from './BuscarDisciplinas.js';

import {validarCampo,validarFormulario,limparValidacoes} from './validacaoFormulario.js';
import {obterHorarios} from './horariosMonitoria.js';

const cargo = Auth.verificarCargo();
if (cargo !== 'PROFESSOR' && cargo !== 'ADMINISTRADOR') {
    window.location.href = './monitorias.html';
    throw new Error('Acesso não autorizado.');
}

//monitoria
const formulario = document.querySelector('.formulario-monitoria');
const mensagemMonitoria = document.querySelector('#mensagem-monitoria');
//disciplinas
const inputDisciplina = document.querySelector('#disciplina');
const inputDisciplinaId = document.querySelector('#disciplina_id');
const sugestoesDisciplinas = document.querySelector('#sugestoes-disciplinas');
let disciplinas = [];

// ======================================================
// VALIDAÇÃO ENQUANTO DIGITA
// ======================================================

formulario.addEventListener('input', (event) => {
    const campo = event.target;

    if (campo.matches('input:not([type="radio"]), select, textarea')) {
        validarCampo(campo);
    }
});

function mostrarMensagem(texto, sucesso) {
    mensagemMonitoria.textContent = texto;
    mensagemMonitoria.classList.remove('mensagemServidorSucesso', 'mensagemServidorErro');
    mensagemMonitoria.classList.add(sucesso ? 'mensagemServidorSucesso' : 'mensagemServidorErro');
}

function limparFormulario() {
    formulario.reset();
    limparValidacoes(formulario);
}

async function carregarDisciplinas() {
    const resposta = await BuscarDisciplinas.listarDisciplinas();
    if (!resposta.ok) {
        console.error('Erro ao buscar disciplinas:', resposta.dados);
        return;
    }

    disciplinas = resposta.dados.result;
}
inputDisciplina.addEventListener('input', () => {
    const texto = inputDisciplina.value.trim().toLowerCase();

    inputDisciplinaId.value = '';
    sugestoesDisciplinas.replaceChildren();

    if (!texto) {
        return;
    }

    const resultados = disciplinas
        .filter((disciplina) =>
            disciplina.curso.toLowerCase().includes(texto)
        )
        .slice(0, 5);

    resultados.forEach((disciplina) => {
        const sugestao = document.createElement('button');

        sugestao.type = 'button';
        sugestao.textContent = disciplina.curso;

        sugestao.addEventListener('click', () => {
            inputDisciplina.value = disciplina.curso;
            inputDisciplinaId.value = disciplina.id;

            sugestoesDisciplinas.replaceChildren();
        });

        sugestoesDisciplinas.appendChild(sugestao);
    });
});

formulario.addEventListener('submit', async (event) => {
    event.preventDefault();    


    mensagemMonitoria.textContent = '';
    mensagemMonitoria.classList.remove('mensagemServidorSucesso', 'mensagemServidorErro');

    // 1. Validar formulário
    if (!validarFormulario(formulario)) {
        return;
    }

    if (!inputDisciplinaId.value) {
        inputDisciplina.classList.remove('valido');
        inputDisciplina.classList.add('invalido');

        inputDisciplina
            .closest('.campo')
            .querySelector('.mensagem-erro')
            .textContent = 'Selecione uma disciplina da lista.';

        return;
    }

    // 2. Pegar dados da monitoria
    const nome = document.querySelector('#nome').value.trim();
    const monitor = document.querySelector('#monitor').value.trim();
    const disciplina = document.querySelector('#disciplina_id').value;
    const local = document.querySelector('#local').value.trim();
    const descricao = document.querySelector('#descricao').value.trim();

    // 3. Pegar horários
    const horarios = obterHorarios(formulario);

    // 4. Montar dados da monitoria
    const monitoria = {
        disciplina_id: Number(disciplina),
        nome: nome,
        monitor_matricula: monitor || null,
        local,
        descricao: descricao || null,
        status: 'ATIVA'
    };

    console.log('Monitoria:', monitoria);
    console.log('Horários:', horarios);

    try {
        // 5. Cadastrar monitoria
        const respostaMonitoria = await BuscarMonitorias.cadastrarMonitoria(monitoria);

        if (!respostaMonitoria.ok) {
            mostrarMensagem(
                respostaMonitoria.dados.message || 'Não foi possível cadastrar a monitoria.',
                false
            );
            return;
        }

        const monitoriaCriada = respostaMonitoria.dados;
        console.log(respostaMonitoria)
        const monitoriaId = monitoriaCriada.result.id;

        if (!monitoriaId) {
            console.error('Resposta do backend:', monitoriaCriada);
            throw new Error('O servidor não retornou o ID da monitoria.');
        }

        // 6. Cadastrar horários
        for (const horario of horarios) {
            const respostaHorario = await BuscarHorarios.cadastrarHorario({
                monitoria_id: monitoriaId,
                dia_semana: horario.dia_semana,
                hora_inicio: horario.hora_inicio,
                hora_fim: horario.hora_fim
            });

            if (!respostaHorario.ok) {
                throw new Error(respostaHorario.dados.message || 'Erro ao cadastrar horário.');
            }
        }

        // 7. Sucesso
        mostrarMensagem(
            respostaMonitoria.dados.message || 'Monitoria criada com sucesso!',
            true
        );

        limparFormulario();

        // Opcional: Redirecionamento
        // setTimeout(() => {
        //     window.location.href = './monitorias.html';
        // }, 3000);

    } catch (erro) {
        console.error('Erro ao criar monitoria:', erro);
        mostrarMensagem(erro.message || 'Erro ao cadastrar monitoria.', false);
    }
});

carregarDisciplinas();