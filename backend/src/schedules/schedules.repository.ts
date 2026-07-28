import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { daysOfTheWeek } from "./enums/daysOfTheWeek.enum";
import { UpdateScheduleDto } from "./dto/update-schedule.dto";

@Injectable()
export class SchedulesRepository{
    constructor(private readonly db: DatabaseService){}

    //CREATE
    async createSchedule(createSchedule: CreateScheduleDto){
        const result = await this.db.query(
            `INSERT INTO horarios
             (monitoria_id, dia_semana, hora_inicio, hora_fim)
             VALUES($1, $2, $3, $4)
            `,[
                createSchedule.monitoria_id, createSchedule.dia_semana, createSchedule.hora_inicio, createSchedule.hora_fim
            ]
        )
        return result.rows[0];
    }
    //FIND
    async existsMonitoringOnDay(monitoria_id: number,dia_semana: string){
        const result = await this.db.query(
            `SELECT *
            FROM horarios
            WHERE monitoria_id = $1
            AND dia_semana = $2;`,[
                monitoria_id,
                dia_semana
            ])
        return result.rows[0];
    }
    async existsMonitoring(monitoria_id: number){
        const result = await this.db.query(`
            SELECT * FROM monitorias
            WHERE id = $1;`,[monitoria_id])
        return result.rows[0];
    }
    async existsSchedule(id: number){
        const result = await this.db.query(
            `
                SELECT * FROM horarios
                WHERE id = $1;
            `,[id]
        )
        return result.rows[0];
    }

    //GET
    async findAllSchedules(page: number){
        const result = await this.db.query(
            `
                SELECT 
                    h.id,
                    d.curso AS disciplina,
                    h.dia_semana,
                    h.hora_inicio,
                    h.hora_fim
                FROM horarios h
                JOIN monitorias m
                ON h.monitoria_id = m.id
                JOIN disciplinas d
                on m.disciplina_id = d.id
                OFFSET $1 LIMIT 20
            `,[page]
        )
        return result.rows;
    }
    async findSchedules(name: string,page: number){
        const result = await this.db.query(
            `
                SELECT
                    h.id,
                    d.curso,
                    h.dia_semana,
                    h.hora_inicio,
                    h.hora_fim
                FROM horarios h
                JOIN monitorias m
                ON h.monitoria_id = m.id
                JOIN disciplinas d
                on m.disciplina_id = d.id
                WHERE h.dia_semana = $1
                OFFSET $2 LIMIT 20
            `,[name,page]
        )
        return result.rows;
    }

    //PATCH
    async updateSchedules(id:number,updateScheduleDto: UpdateScheduleDto){
        const result = await this.db.query(
            `
                UPDATE horarios
                SET
                    dia_semana = COALESCE($1, dia_semana), 
                    hora_inicio = COALESCE($2, hora_inicio),
                    hora_fim = COALESCE($3, hora_fim)
                WHERE id = $4
            `,[updateScheduleDto.dia_semana, updateScheduleDto.hora_inicio, updateScheduleDto.hora_fim, id]
        )
        return result.rows[0];
    }

    //DELETE
    async deleteSchedule(id: number){
        const result = await this.db.query(
            `
                DELETE FROM horarios
                WHERE id = $1;
            `,[id]
        )
        return result.rows[0];
    }
}