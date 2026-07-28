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
exports.SchedulesService = void 0;
const common_1 = require("@nestjs/common");
const schedules_repository_1 = require("./schedules.repository");
let SchedulesService = class SchedulesService {
    schedulesRepository;
    constructor(schedulesRepository) {
        this.schedulesRepository = schedulesRepository;
    }
    async createSchedule(createScheduleDto) {
        const existsMonitoring = await this.schedulesRepository.existsMonitoring(createScheduleDto.monitoria_id);
        if (!existsMonitoring) {
            throw new common_1.NotFoundException('Nao existe essa monitoria');
        }
        const alreadyExistsMonitoringInThatDay = await this.schedulesRepository.existsMonitoringOnDay(createScheduleDto.monitoria_id, createScheduleDto.dia_semana);
        if (alreadyExistsMonitoringInThatDay) {
            throw new common_1.ConflictException('Ja existe uma monitoria nesse dia');
        }
        const horaInicio = Number(createScheduleDto.hora_inicio.replace(':', ''));
        const horaFim = Number(createScheduleDto.hora_fim.replace(':', ''));
        if (horaInicio >= horaFim) {
            throw new common_1.BadRequestException('Hora de início deve ser menor que hora final');
        }
        const result = await this.schedulesRepository.createSchedule(createScheduleDto);
        return { message: "Horario cadastrado com sucesso", result };
    }
    async findAllSchedules(page) {
        const result = await this.schedulesRepository.findAllSchedules(page);
        return { message: 'Sucesso em encontrar todos os horarios', result };
    }
    async findSchedules(name, page) {
        const result = await this.schedulesRepository.findSchedules(name, page);
        return { message: 'sucesso em encontrar os horarios', result };
    }
    async updateSchedule(id, updateScheduleDto) {
        const existsSchedule = this.schedulesRepository.existsSchedule(id);
        if (!existsSchedule) {
            throw new common_1.NotFoundException('Horario nao encontrado');
        }
        const result = await this.schedulesRepository.updateSchedules(id, updateScheduleDto);
        return { message: 'Horario atualizado com sucesso' };
    }
    async deleteSchedule(id) {
        const existsSchedule = await this.schedulesRepository.existsSchedule(id);
        if (!existsSchedule) {
            throw new common_1.NotFoundException('Horario nao encontrado');
        }
        const result = await this.schedulesRepository.deleteSchedule(id);
        return { message: "Horario deletado com sucesso", result };
    }
};
exports.SchedulesService = SchedulesService;
exports.SchedulesService = SchedulesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [schedules_repository_1.SchedulesRepository])
], SchedulesService);
//# sourceMappingURL=schedules.service.js.map