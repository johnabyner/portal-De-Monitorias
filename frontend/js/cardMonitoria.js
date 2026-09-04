    const DIAS_DA_SEMANA = [
        "segunda",
        "terca",
        "quarta",
        "quinta",
        "sexta",
    ];

    //CARD
    function criarCardMonitoria({
        id,
        curso,
        monitor_nome,
        professor_nome,
        local,
        descricao,
        status,
        horarios,
        nome,
        favoritado = false
    }){
        const card = document.createElement("article"); //pq article
        card.className = "card-monitoria";
        card.dataset.id = id;


        card.innerHTML = `
            <div class="card-header">
                <h2>${nome}</h2>

                <button
                    class="favorito ${favoritado ? "ativo" : ""}"
                    type="button"
                    aria-label="Favoritar monitoria de ${curso}"
                    aria-pressed="${favoritado}"
                >
                    <img
                        src="../icons/star-outline.svg"
                        alt=""
                    >
                </button>
            </div>

            <div class="informacoes-monitor">
                <p>Disciplina: ${curso ?? "Não definido"}</p>
                <p>Professor: ${professor_nome ?? "Não definido"}</p>
                <p>Monitor: ${monitor_nome ?? "Não definido"}</p>
                <p>Local: ${local}</p>
            </div>

            <div class="card-expandido"></div>
        `;

        const detalhes = card.querySelector(".card-expandido");
        detalhes.appendChild(criarTabelaDisponibilidade(horarios)); //CHAMANDO PARA CRIAR NOSSA TABELA

        return card;
    }

    //TABELA DE HORARIOS DO CARD
    function criarTabelaDisponibilidade(horarios) {
        const tabela = document.createElement("table");
        tabela.className = "tabela-disponibilidade";

        tabela.innerHTML = `
            <thead>
                <tr>
                    <th>Dia</th>
                    <th>Horário disponível</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        const corpo = tabela.querySelector("tbody");
        //porcada dia da semana, vai colocar dentro dele os horarios para organizar
        DIAS_DA_SEMANA.forEach((dia) => {  
            const horariosDoDia = horarios.filter( 
                ({ dia: diaHorario }) => diaHorario === dia
            );
            //se tiver horario vai mostrar inicio - termino, se nao vai mostrar sem disponibilidade
            const horario = horariosDoDia.length
                ? horariosDoDia
                    .map(({ inicio, termino }) => `${inicio} - ${termino}`)
                    .join(", ")
                : "Sem disponibilidade";

            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${dia}-feira</td>
                <td>${horario}</td>
            `;

            corpo.appendChild(linha);
        });

        return tabela;
    }

export {criarCardMonitoria,criarTabelaDisponibilidade};