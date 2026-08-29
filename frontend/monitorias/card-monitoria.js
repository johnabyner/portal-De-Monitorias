const monitorias = [
    {
        materia: "Matemática",
        monitor: "João",
        contato: "example@mail.com",
        disponibilidade: [
            { dia: "Segunda-feira", inicio: "08:00", termino: "10:00" },
            { dia: "Quarta-feira", inicio: "14:00", termino: "16:00" },
            { dia: "Sexta-feira", inicio: "10:00", termino: "12:00" }
        ]
    },
    {
        materia: "Física",
        monitor: "Maria",
        contato: "example@mail.com",
        disponibilidade: [
            { dia: "Terça-feira", inicio: "09:00", termino: "11:00" },
            { dia: "Quinta-feira", inicio: "13:00", termino: "15:00" }
        ]
    },
    {
        materia: "Matemática",
        monitor: "João",
        contato: "example@mail.com",
        disponibilidade: [
            { dia: "Terça-feira", inicio: "15:00", termino: "17:00" },
            { dia: "Quinta-feira", inicio: "08:00", termino: "10:00" }
        ]
    },
];

const listaMonitorias = document.querySelector(".lista-monitorias");

function criarTabelaDisponibilidade(disponibilidade) {
    const tabela = document.createElement("table");
    tabela.className = "tabela-disponibilidade";

    const cabecalho = document.createElement("thead");
    const linhaCabecalho = document.createElement("tr");
    const diaCabecalho = document.createElement("th");
    const horarioCabecalho = document.createElement("th");

    diaCabecalho.textContent = "Dia";
    horarioCabecalho.textContent = "Horário disponível";
    linhaCabecalho.append(diaCabecalho, horarioCabecalho);
    cabecalho.append(linhaCabecalho);

    const corpo = document.createElement("tbody");
    const diasDaSemana = [
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira"
    ];

    diasDaSemana.forEach((dia) => {
        const linha = document.createElement("tr");
        const nomeDia = document.createElement("td");
        const horario = document.createElement("td");
        const horariosDoDia = disponibilidade.filter((item) => item.dia === dia);

        nomeDia.textContent = dia;
        horario.textContent = horariosDoDia.length
            ? horariosDoDia.map((item) => `${item.inicio} - ${item.termino}`).join(", ")
            : "Sem disponibilidade";

        linha.append(nomeDia, horario);
        corpo.append(linha);
    });

    tabela.append(cabecalho, corpo);
    return tabela;
}

function criarCardMonitoria({ materia, monitor, contato, disponibilidade }) {
    const card = document.createElement("article");
    card.className = "card-monitoria";

    const cabecalho = document.createElement("div");
    cabecalho.className = "card-header";

    const titulo = document.createElement("h2");
    titulo.textContent = materia;

    const botaoFavorito = document.createElement("button");
    botaoFavorito.className = "favorito";
    botaoFavorito.type = "button";
    botaoFavorito.setAttribute("aria-label", `Favoritar monitoria de ${materia}`);

    const iconeFavorito = document.createElement("img");
    iconeFavorito.src = "../icons/star-outline.svg";
    iconeFavorito.alt = "";

    const nomeMonitor = document.createElement("p");
    nomeMonitor.textContent = `Monitor: ${monitor}`;

    const informacoesMonitor = document.createElement("div");
    informacoesMonitor.className = "informacoes-monitor";

    const contatoMonitor = document.createElement("span");
    contatoMonitor.className = "contato-monitor";
    contatoMonitor.textContent = `Contato: ${contato}`;

    const detalhes = document.createElement("div");
    detalhes.className = "card-expandido";
    detalhes.append(criarTabelaDisponibilidade(disponibilidade));

    botaoFavorito.append(iconeFavorito);
    cabecalho.append(titulo, botaoFavorito);
    informacoesMonitor.append(nomeMonitor, contatoMonitor);
    card.append(cabecalho, informacoesMonitor, detalhes);

    return card;
}

function renderizarMonitorias() {
    listaMonitorias.replaceChildren(...monitorias.map(criarCardMonitoria));
}

renderizarMonitorias();
