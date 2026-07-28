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
exports.MonitoringRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let MonitoringRepository = class MonitoringRepository {
    db;
    constructor(db) {
        this.db = db;
    }
    async createMonitoring(createMonitoringDto) {
        const result = await this.db.query(`INSERT INTO monitorias
            (disciplina_id,
             monitor_matricula,
             professor_matricula,
             local,
             descricao,
             status)
            VALUES($1,$2,$3,$4,$5,$6);`, [createMonitoringDto.disciplina_id,
            createMonitoringDto.monitor_matricula ?? null,
            createMonitoringDto.professor_matricula,
            createMonitoringDto.local ?? null,
            createMonitoringDto.descricao ?? null,
            createMonitoringDto.status ?? 'ATIVA',
        ]);
        return result.rows[0];
    }
    async findById(id) {
        const result = await this.db.query(`
                SELECT * FROM monitorias WHERE id = $1;
            `, [id]);
        return result.rows[0];
    }
    async findAllMonitoring(page) {
        const result = await this.db.query(`
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
            `, [page]);
        return result.rows;
    }
    async findMonitoring(name, page) {
        const result = await this.db.query(`
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
            `, [`%${name}%`, page]);
        return result.rows;
    }
    async updateMonitoring(id, updateMonitoringDto) {
        const result = await this.db.query(` 
                UPDATE monitorias
                SET
                    disciplina_id = COALESCE($2,disciplina_id),
                    monitor_matricula = COALESCE($3,monitor_matricula),
                    local = COALESCE($4,local),
                    descricao = COALESCE($5,descricao),
                    status = COALESCE($6,status)
                WHERE id = $1
            `, [id,
            updateMonitoringDto.disciplina_id ?? null,
            updateMonitoringDto.monitor_matricula ?? null,
            updateMonitoringDto.local ?? null,
            updateMonitoringDto.descricao ?? null,
            updateMonitoringDto.status ?? null,
        ]);
        return result.rows[0];
    }
    async disableMonitoring(id) {
        const result = await this.db.query(`
            UPDATE monitorias
            SET status = 'DESATIVADA'
            WHERE id = $1
            `, [id]);
        return result.rows[0];
    }
};
exports.MonitoringRepository = MonitoringRepository;
exports.MonitoringRepository = MonitoringRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], MonitoringRepository);
//# sourceMappingURL=monitoring.repository.js.map