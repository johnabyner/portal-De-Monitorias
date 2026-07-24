// npx tsx src/database/seed-disciplinas.ts

import 'dotenv/config';
import { DatabaseService } from "./database.service";
import { DisciplinesRepository } from "../disciplines/disciplines.repository";

async function main() {
    const db = new DatabaseService();

    await db.onModuleInit();

    const repository = new DisciplinesRepository(db);

    const disciplinas = [
        "Agroecologia e Fundamentos do Solo",
        "Algoritmos 2",
        "Biologia (2º ano do Ensino Médio)",
        "Biologia Aplicada ao Meio Ambiente",
        "Biologia de Algas e Criptógamas",
        "Biologia e Microbiologia dos Alimentos",
        "Cálculo I e Cálculo II",
        "Cartografia e Topografia / Topografia",
        "Educação Física",
        "Educação Física II",
        "Elaboração de Projetos e Projeto Integrador",
        "Entomologia Aplicada",
        "Expressão Gráfica",
        "Filosofia III",
        "Física I (Ensino Médio)",
        "Física Geral II",
        "Fisiologia Vegetal",
        "Fundamentos da Química Orgânica",
        "Geografia",
        "Geografia I",
        "História",
        "Inglês para Fins Específicos",
        "Introdução à Agroindústria e Tecnologia de Produtos Apícolas e Ovos",
        "Matemática I",
        "Matemática II",
        "Matemática III",
        "Pré-Cálculo e Cálculo I",
        "Química Geral",
        "Química Geral (Graduação)",
        "Química do 2º Ano",
        "Química Orgânica",
        "Tecnologia de Cereais e Panificação e Tecnologia de Produtos de Origem Vegetal e Tecnologia de Vegetais",
        "Sociologia II",
        "Zoologia de Vertebrados e Invertebrados I e II",
    ];

    //descomente essa parte para popular o banco com as disciplinas acima
    //ctrl+k+u
    // for (const curso of disciplinas) {
    //     await repository.createDiscipline(
    //         null,
    //         curso,
    //         `Disciplina de ${curso}.`
    //     );
    // }

    console.log(`✔ ${disciplinas.length} disciplinas inseridas com sucesso!`);

    process.exit(0);
}

main().catch((err) => {
    console.error("Erro ao popular o banco:", err);
    process.exit(1);
});