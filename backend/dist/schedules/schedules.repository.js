"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulesRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let SchedulesRepository = class SchedulesRepository {
    db;
    constructor(db) {
        this.db = db;
    }
    async createSchedule(createSchedule) {
        const result = await this.db.query(`INSERT INTO horarios
             (monitoria_id, dia_semana, hora_inicio, hora_fim)
             VALUES($1, $2, $3, $4)
            `, [
            createSchedule.monitoria_id, createSchedule.dia_semana, createSchedule.hora_inicio, createSchedule.hora_fim
        ]);
        return result.rows[0];
    }
    async existsMonitoringOnDay(monitoria_id, dia_semana) {
        const result = await this.db.query(`SELECT *
            FROM horarios
            WHERE monitoria_id = $1
            AND dia_semana = $2;`, [
            monitoria_id,
            dia_semana
        ]);
        return result.rows[0];
    }
    async existsMonitoring(monitoria_id) {
        const result = await this.db.query(`
            SELECT * FROM monitorias
            WHERE id = $1;`, [monitoria_id]);
        return result.rows[0];
    }
    async existsSchedule(id) {
        const result = await this.db.query(`
                SELECT * FROM horarios
                WHERE id = $1;
            `, [id]);
        return result.rows[0];
    }
    async findAllSchedules(page) {
        const result = await this.db.query(`
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
            `, [page]);
        return result.rows;
    }
    async findSchedules(name, page) {
        const result = await this.db.query(`
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
            `, [name, page]);
        return result.rows;
    }
    async updateSchedules(id, updateScheduleDto) {
        const result = await this.db.query(`
                UPDATE horarios
                SET
                    dia_semana = COALESCE($1, dia_semana), 
                    hora_inicio = COALESCE($2, hora_inicio),
                    hora_fim = COALESCE($3, hora_fim)
                WHERE id = $4
            `, [updateScheduleDto.dia_semana, updateScheduleDto.hora_inicio, updateScheduleDto.hora_fim, id]);
        return result.rows[0];
    }
    async deleteSchedule(id) {
        const result = await this.db.query(`
                DELETE FROM horarios
                WHERE id = $1;
            `, [id]);
        return result.rows[0];
    }
};
exports.SchedulesRepository = SchedulesRepository;
exports.SchedulesRepository = SchedulesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], SchedulesRepository);
//# sourceMappingURL=schedules.repository.js.map