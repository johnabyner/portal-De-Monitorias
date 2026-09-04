import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class FavoritesRepository{
    constructor(private readonly db: DatabaseService){}
    //CREATE
    async createFavoriteMonitoring(matricula: string, id: number){
        const result = await this.db.query(
            `
                INSERT INTO favoritos (user_matricula,monitoria_id) VALUES ($1,$2);
            `,[matricula,id]
        );
        return result.rows[0];
    }
    //GET
    async findMonitoring(id: number){
        const result = await this.db.query(
            `
                SELECT * FROM monitorias WHERE id = $1;
            `,[id]
        );
        return result.rows[0];
    }
    async findByRegistration(matricula: string) {
        const result = await this.db.query(
            `SELECT * FROM users WHERE matricula = $1;`,
            [matricula],
        );

        return result.rows[0];
    }
    async findFavorite(matricula: number, monitoriaId: number) {
        const result = await this.db.query(
            `
            SELECT *
            FROM favoritos
            WHERE user_matricula = $1
            AND monitoria_id = $2
            `,
            [matricula, monitoriaId]
        );

        return result.rows[0];
    }

    //GET
    async getFavoriteMonitoring(matricula: string, name: string,page: number){
        const result = await this.db.query(
            `
            SELECT
                m.id,
                m.nome,
                d.curso ,
                u_monitor.nome AS monitor_nome,
                u_professor.nome AS professor_nome,
                m.local,
                m.descricao,
                m.status,
                COALESCE(
                        json_agg(
                            json_build_object(
                                'dia', h.dia_semana,
                                'inicio', h.hora_inicio,
                                'termino', h.hora_fim
                            )
                        ) FILTER(WHERE h.id IS NOT NULL),
                        '[]'
                    ) AS horarios
            FROM favoritos f

            INNER JOIN monitorias m
                ON f.monitoria_id = m.id

            INNER JOIN disciplinas d
                ON m.disciplina_id = d.id

            LEFT JOIN users u_monitor
                ON m.monitor_matricula = u_monitor.matricula

            INNER JOIN users u_professor
                ON m.professor_matricula = u_professor.matricula
     
            LEFT JOIN horarios h
                on h.monitoria_id = m.id
            
            WHERE f.user_matricula = $1
                AND d.curso ILIKE $2
                AND m.status = 'ATIVA'

            GROUP BY 
                m.id,
                m.nome,
                d.curso,
                monitor_nome,
                professor_nome,
                m.local,
                m.descricao,
                m.status

            ORDER BY m.id
            LIMIT 20
            OFFSET $3;
            `,[matricula,  `%${name}%`,page]
        )
        return result.rows;
    }
    async getAllFavoritesMonitorings(matricula: string,page: number){
        const result = await this.db.query(
            `
            SELECT
                m.id,
                m.nome,
                d.curso,
                u_monitor.nome AS monitor_nome,
                u_professor.nome AS professor_nome,
                m.local,
                m.descricao,
                m.status,
                COALESCE(
                        json_agg(
                            json_build_object(
                                'dia', h.dia_semana,
                                'inicio', h.hora_inicio,
                                'termino', h.hora_fim
                            )
                        ) FILTER(WHERE h.id IS NOT NULL),
                        '[]'
                ) AS horarios
            FROM favoritos f

            INNER JOIN monitorias m
                ON f.monitoria_id = m.id

            INNER JOIN disciplinas d
                ON m.disciplina_id = d.id

            LEFT JOIN users u_monitor
                ON m.monitor_matricula = u_monitor.matricula
                
            INNER JOIN users u_professor
                ON m.professor_matricula = u_professor.matricula

            LEFT JOIN horarios h
                ON h.monitoria_id = m.id

            WHERE m.status = 'ATIVA'
            AND f.user_matricula = $1

            GROUP BY 
                m.id,
                m.nome,
                d.curso,
                monitor_nome,
                professor_nome,
                m.local,
                m.descricao,
                m.status

            ORDER BY m.id
            LIMIT 20
            OFFSET $2;
            `,[matricula,page]
        )
        return result.rows;
    }

    //DELETE
    async deleteFavoriteMonitoring(id: number, matricula: string){
        const result = await this.db.query(
            `
                DELETE FROM favoritos WHERE monitoria_id = $1 AND user_matricula = $2;
            `,[id, matricula]
        )
        return result.rows[0];
    }
}