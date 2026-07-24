import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { CreateMonitoringDto } from "./dto/create-monitoring.dto";
import { UpdateMonitoringDto } from "./dto/update-monitoring.dto";

@Injectable()
export class MonitoringRepository{
    constructor(private readonly db:DatabaseService){}

    async createMonitoring(createMonitoringDto: CreateMonitoringDto){
        const result = await this.db.query(
            `INSERT INTO monitorias
            (disciplina_id,
             monitor_matricula,
             professor_matricula,
             local,
             descricao,
             status)
            VALUES($1,$2,$3,$4,$5,$6);`,
            [   createMonitoringDto.disciplina_id,
                createMonitoringDto.monitor_matricula ?? null,
                createMonitoringDto.professor_matricula,
                createMonitoringDto.local ?? null,
                createMonitoringDto.descricao ?? null,
                createMonitoringDto.status ?? 'ATIVA',
            ]
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
                    m.monitor_matricula,
                    m.professor_matricula,
                    m.local,
                    m.descricao,
                    m.status
                FROM monitorias m
                join disciplinas d
                on m.disciplina_id = d.id
                WHERE m.status = 'ATIVA'
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
                    m.monitor_matricula,
                    m.professor_matricula,
                    m.local,
                    m.descricao,
                    m.status
                FROM monitorias m
                join disciplinas d
                on m.disciplina_id = d.id
                WHERE d.curso ILIKE $1 AND m.status = 'ATIVA'
                OFFSET $2 LIMIT 20
            `,
            [`%${name}%`,page]
        )
        return result.rows;
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
