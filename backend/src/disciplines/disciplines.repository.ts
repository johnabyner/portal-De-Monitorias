import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { UpdateDisciplineDto } from "./dto/update-discipline.dto";

@Injectable()
export class DisciplinesRepository{
    constructor(private readonly db: DatabaseService){}

    async createDiscipline(matricula: string, curso:string, descricao:string){
        const result = await this.db.query(
            `INSERT INTO disciplinas (professor_matricula, curso, descricao) VALUES ($1, $2, $3);`,
            [matricula ?? null, curso, descricao]
        )
        return result.rows[0];
    }

    async findAllDisciplines(){
        const result = await this.db.query(
            `SELECT 
                d.id, 
                u.nome AS professor,
                d.curso, 
                d.descricao 
             FROM disciplinas d  
             LEFT JOIN users u
             on d.professor_matricula = u.matricula;`

        )
        return result.rows;
    }
    async findDiscipline(query:string){
        const result = await this.db.query(
            `SELECT 
                d.id,
                u.nome AS professor,
                d.curso,
                d.descricao
             FROM disciplinas d
             LEFT JOIN users u
             on d.professor_matricula = u.matricula
             WHERE curso ILIKE $1;
            `,
            [
                `%${query}%`
            ]
        )
        return result.rows;
    }

    async findById(id: number) {
        const result = await this.db.query(
            `SELECT 
                id,
                professor_matricula,
                curso,
                descricao
            FROM disciplinas
            WHERE id = $1;`,
            [id]
        );

        return result.rows[0];
    }

    async updateDiscipline(discipline: UpdateDisciplineDto,id: number){
        const result = await this.db.query(
            `UPDATE disciplinas 
             SET
                professor_matricula = COALESCE($1, professor_matricula),
                curso = COALESCE($2, curso),
                descricao = COALESCE($3, descricao)
             WHERE id =  $4
            `,[discipline.professor_matricula ?? null, discipline.curso ?? null, discipline.descricao ?? null, id]
        )
        return result.rows[0];
    }

    async deleteDiscipline(id: number){
        const result = await this.db.query(
            `DELETE FROM disciplinas WHERE id = $1;`,[id]
        )
        return result.rows[0];
    }
}

// id
// curso
// descricao
// professor_matricula

//CREATE
//READ
//UPDATE
//DELETE