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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulesController = void 0;
const common_1 = require("@nestjs/common");
const schedules_service_1 = require("./schedules.service");
const create_schedule_dto_1 = require("./dto/create-schedule.dto");
const update_schedule_dto_1 = require("./dto/update-schedule.dto");
const swagger_1 = require("@nestjs/swagger");
let SchedulesController = class SchedulesController {
    schedulesService;
    constructor(schedulesService) {
        this.schedulesService = schedulesService;
    }
    createSchedule(createScheduleDto) {
        return this.schedulesService.createSchedule(createScheduleDto);
    }
    get(page = 0, name) {
        if (name) {
            return this.schedulesService.findSchedules(name, page);
        }
        return this.schedulesService.findAllSchedules(page);
    }
    updateSchedule(id, updateScheduleDto) {
        return this.schedulesService.updateSchedule(id, updateScheduleDto);
    }
    deleteSchedule(id) {
        return this.schedulesService.deleteSchedule(id);
    }
};
exports.SchedulesController = SchedulesController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Cadastrar horario' }),
    (0, swagger_1.ApiBody)({
        type: create_schedule_dto_1.CreateScheduleDto,
        description: 'Detalhes do horario para cadastro',
        examples: {
            horario: {
                summary: 'Exemplo de cadastro',
                value: {
                    monitoria_id: 1,
                    dia_semana: 'segunda',
                    hora_inicio: '14:00',
                    hora_fim: '15:00'
                }
            }
        }
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_schedule_dto_1.CreateScheduleDto]),
    __metadata("design:returntype", void 0)
], SchedulesController.prototype, "createSchedule", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Listar horarios' }),
    (0, swagger_1.ApiQuery)({ name: 'page', example: 0, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'name', example: 'segunda', required: false }),
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SchedulesController.prototype, "get", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar horario' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiBody)({
        type: update_schedule_dto_1.UpdateScheduleDto,
        description: 'Detalhes do horario para atualizar',
        examples: {
            horario: {
                summary: 'Exemplo de atualizaçao',
                value: {
                    dia_semana: 'segunda',
                    hora_inicio: '14:00',
                    hora_fim: '16:00'
                }
            }
        }
    }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_schedule_dto_1.UpdateScheduleDto]),
    __metadata("design:returntype", void 0)
], SchedulesController.prototype, "updateSchedule", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SchedulesController.prototype, "deleteSchedule", null);
exports.SchedulesController = SchedulesController = __decorate([
    (0, common_1.Controller)('schedules'),
    __metadata("design:paramtypes", [schedules_service_1.SchedulesService])
], SchedulesController);
//# sourceMappingURL=schedules.controller.js.map