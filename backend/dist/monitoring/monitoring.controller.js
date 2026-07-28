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
exports.MonitoringController = void 0;
const common_1 = require("@nestjs/common");
const monitoring_service_1 = require("./monitoring.service");
const create_monitoring_dto_1 = require("./dto/create-monitoring.dto");
const update_monitoring_dto_1 = require("./dto/update-monitoring.dto");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const swagger_1 = require("@nestjs/swagger");
let MonitoringController = class MonitoringController {
    monitoringService;
    constructor(monitoringService) {
        this.monitoringService = monitoringService;
    }
    createMonitoring(createMonitoringDto) {
        return this.monitoringService.createMonitoring(createMonitoringDto);
    }
    findAllMonitoring(page = 0, name) {
        if (name) {
            return this.monitoringService.findMonitoring(name, page);
        }
        return this.monitoringService.findAllMonitoring(page);
    }
    updateMonitoring(id, updateMonitoringDto) {
        return this.monitoringService.updateMonitoring(id, updateMonitoringDto);
    }
    disableMonitoring(id) {
        return this.monitoringService.disableMonitoring(id);
    }
};
exports.MonitoringController = MonitoringController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Cadastrar monitoria' }),
    (0, swagger_1.ApiBody)({
        type: create_monitoring_dto_1.CreateMonitoringDto,
        description: 'Detalhes para cadastrar uma monitoria',
        examples: {
            monitoria: {
                summary: 'exemplo de cadastro de monitoria',
                value: {
                    discipina_id: 1,
                    monitor_matricula: '20230001',
                    professor_matricula: '20230001',
                    local: 'bliblioteca',
                    descricao: 'avise antes',
                    status: 'ATIVA'
                }
            }
        }
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('professor', 'administrador'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_monitoring_dto_1.CreateMonitoringDto]),
    __metadata("design:returntype", void 0)
], MonitoringController.prototype, "createMonitoring", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Listar monitorias' }),
    (0, swagger_1.ApiQuery)({ name: 'page', example: 0, required: false }),
    (0, swagger_1.ApiQuery)({ name: 'name', example: 'matematica', required: false }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], MonitoringController.prototype, "findAllMonitoring", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar monitoria' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, swagger_1.ApiBody)({
        type: update_monitoring_dto_1.UpdateMonitoringDto,
        description: 'Detalhes para atualizar uma monitoria',
        examples: {
            monitoria: {
                summary: 'Exemplo de atualizaçao de uma monitoria',
                value: {
                    disciplina_id: 1,
                    monitor_matricula: '20230001',
                    local: 'bliblioteca',
                    descricao: 'venha com seu material',
                    status: 'ATIVADA'
                }
            }
        }
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('professor', 'administrador'),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_monitoring_dto_1.UpdateMonitoringDto]),
    __metadata("design:returntype", void 0)
], MonitoringController.prototype, "updateMonitoring", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Deletar monitoria' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1 }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('professor', 'administrador'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MonitoringController.prototype, "disableMonitoring", null);
exports.MonitoringController = MonitoringController = __decorate([
    (0, swagger_1.ApiTags)('monitoring'),
    (0, common_1.Controller)('monitoring'),
    __metadata("design:paramtypes", [monitoring_service_1.MonitoringService])
], MonitoringController);
//# sourceMappingURL=monitoring.controller.js.map