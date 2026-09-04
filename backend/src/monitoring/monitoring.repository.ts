import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { CreateMonitoringDto } from "./dto/create-monitoring.dto";
import { UpdateMonitoringDto } from "./dto/update-monitoring.dto";

@Injectable()
export class MonitoringRepository{
    constructor(private readonly db:DatabaseService){}

    async createMonitoring(createMonitoringDto: CreateMonitoringDto, professorMatricula: string){
        const result = await this.db.query(
            `INSERT INTO monitorias
            (disciplina_id,
             nome,
             monitor_matricula,
             professor_matricula,
             local,
             descricao,
             status)
            VALUES($1,$7,$2,$3,$4,$5,$6)
            RETURNING id;`,
            [   createMonitoringDto.disciplina_id,
                createMonitoringDto.monitor_matricula ?? null,
                professorMatricula,
                createMonitoringDto.local ?? null,
                createMonitoringDto.descricao ?? null,
                createMonitoringDto.status ?? 'ATIVA',
                createMonitoringDto.nome
            ]
        )
        return result.rows[0];
    }
    async findByIdDiscipline(id: number){
        const result = await this.db.query(
            `
                SELECT * FROM disciplinas WHERE id = $1;
            `,[id]
        )
        return result.rows[0];  
    }
    async findByRegistration(matricula: string){
        const result = await this.db.query(
            `
                SELECT * FROM users WHERE matricula = $1;
            `,[matricula]
        )
        return result.rows[0];
    }
    async findById(id: number){
        const result = await this.db.query(
            `
                SELECT * FROM monitorias WHERE id = $1;
            `,[id]
        )
        return result.rows[0];
    }

    async findAllMonitoring(page: number){
        const result = await this.db.query(
            `
                SELECT
                    m.id,
                    d.curso,
                    m.nome,
                    monitor.nome AS monitor_nome,
                    professor.nome AS professor_nome,
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
                FROM monitorias m
                JOIN disciplinas d
                    on m.disciplina_id = d.id
                LEFT JOIN users monitor
                    ON m.monitor_matricula = monitor.matricula
                LEFT JOIN users professor
                    ON m.professor_matricula = professor.matricula
                LEFT JOIN horarios h
                    on h.monitoria_id = m.id
                    WHERE m.status = 'ATIVA'

                GROUP BY 
                    m.id,
                    m.nome,
                    d.curso,
                    monitor_nome,
                    professor_nome,
                    m.local,
                    m.descricao,
                    m.status
                OFFSET $1 LIMIT 20 
            `,
            [page]
        )
        return result.rows;
    }
    async findMonitoring(name: string, page: number){
        const result = await this.db.query(
            `
                SELECT
                    m.id,
                    d.curso,
                    m.nome,
                    monitor.nome AS monitor_nome,
                    professor.nome AS professor_nome,
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
                        ) FILTER (WHERE h.id IS NOT NULL),
                         '[]'
                    )
                FROM monitorias m
                JOIN disciplinas d
                    on m.disciplina_id = d.id
                LEFT JOIN users monitor
                    on m.monitor_matricula = monitor.matricula
                LEFT JOIN users professor
                    on m.professor_matricula = professor.matricula
                LEFT JOIN horarios h
                    on h.monitoria_id = m.id
                WHERE d.curso ILIKE $1 AND m.status = 'ATIVA'
                GROUP BY
                    m.id,
                    m.nome,
                    d.curso,
                    monitor_nome,
                    professor_nome,
                    m.local,
                    m.descricao,
                    m.status
                OFFSET $2 LIMIT 20
            `,
            [`%${name}%`,page]
        )
        return result.rows;
    }
    async findMyMonitoring(registration: string, page: number, column: string){
        const result = await this.db.query(
            `
                SELECT
                    m.id,
                    d.curso,
                    m.nome,
                    monitor.nome AS monitor_nome,
                    professor.nome AS professor_nome,
                    m.local,
                    m.descricao,
                    m.status
                FROM monitorias m
                JOIN disciplinas d
                    on m.disciplina_id = d.id
                LEFT JOIN users monitor
                    on m.monitor_matricula = monitor.matricula
                LEFT JOIN users professor
                    on m.professor_matricula = professor.matricula
                WHERE m.${column} = $1
                GROUP BY
                    m.id,
                    d.curso,
                    monitor_nome,
                    professor_nome,
                    m.local,
                    m.descricao,
                    m.status
                OFFSET $2
                LIMIT 20
            `,[registration, page]
        ) 
        return result.rows
    }

    async updateMonitoring(id: number,updateMonitoringDto: UpdateMonitoringDto){
        const result = await this.db.query(
            ` 
                UPDATE monitorias
                SET
                    disciplina_id = COALESCE($2,disciplina_id),
                    monitor_matricula = COALESCE($3,monitor_matricula),
                    local = COALESCE($4,local),
                    descricao = COALESCE($5,descricao),
                    status = COALESCE($6,status)
                WHERE id = $1
            `,
            [   id,
                updateMonitoringDto.disciplina_id ?? null,
                updateMonitoringDto.monitor_matricula ?? null,
                updateMonitoringDto.local ?? null,
                updateMonitoringDto.descricao ?? null,
                updateMonitoringDto.status ?? null,
            ]
        )
        return result.rows[0];
    }

    async disableMonitoring(id: number) {
        const result = await this.db.query(
            `
            UPDATE monitorias
            SET status = 'DESATIVADA'
            WHERE id = $1
            `,
            [id]
        );

        return result.rows[0];
    }
}

//disciplina_id
// monitor_matricula
// professor_matricula
// local
// descricao
// status
//DEFAULT 'ATIVA'
