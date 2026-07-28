"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisciplinesRepository = void 0;
class DisciplinesRepository {
    db;
    constructor(db) {
        this.db = db;
    }
    async createDiscipline(matricula, curso, descricao) {
        const result = await this.db.query(`INSERT INTO disciplinas (professor_matricula, curso, descricao) VALUES ($1, $2, $3);`, [matricula ?? null, curso, descricao]);
        return result.rows[0];
    }
    async findAllDisciplines(page) {
        const result = await this.db.query(`SELECT 
                d.id, 
                u.nome AS professor,
                d.curso, 
                d.descricao 
             FROM disciplinas d  
             JOIN users u
             on d.professor_matricula = u.matricula
             OFFSET $1 LIMIT  20;`, [page]);
        return result.rows;
    }
    async findDiscipline(query, page) {
        const result = await this.db.query(`SELECT 
                d.id,
                u.nome AS professor,
                d.curso,
                d.descricao
             FROM disciplinas d
             JOIN users u
             on d.professor_matricula = u.matricula
             WHERE curso LIKE $1
             OFFSET $2 LIMIT  20;
            `, [
            `%${query}%`, page
        ]);
        return result.rows;
    }
    async updateDiscipline(discipline, id) {
        const result = await this.db.query(`UPDATE disciplinas 
             SET
                professor_matricula = COALESCE($1, professor_matricula),
                curso = COALESCE($2, curso),
                descricao = COALESCE($3, descricao)
             WHERE id =  $4
            `, [discipline.professor_matricula ?? null, discipline.curso ?? null, discipline.descricao ?? null, id]);
        return result.rows[0];
    }
    async deleteDiscipline(id) {
        const result = await this.db.query(`DELETE FROM disciplinas WHERE id = $1;`, [id]);
        return result.rows[0];
    }
}
exports.DisciplinesRepository = DisciplinesRepository;
//# sourceMappingURL=disciplines.repository.js.map