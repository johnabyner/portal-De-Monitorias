"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const database_service_1 = require("./database.service");
const disciplines_repository_1 = require("../disciplines/disciplines.repository");
async function main() {
    const db = new database_service_1.DatabaseService();
    await db.onModuleInit();
    const repository = new disciplines_repository_1.DisciplinesRepository(db);
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
    console.log(`✔ ${disciplinas.length} disciplinas inseridas com sucesso!`);
    process.exit(0);
}
main().catch((err) => {
    console.error("Erro ao popular o banco:", err);
    process.exit(1);
});
//# sourceMappingURL=seed-disciplinas.js.map