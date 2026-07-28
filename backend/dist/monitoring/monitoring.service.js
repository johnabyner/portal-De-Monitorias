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
exports.MonitoringService = void 0;
const common_1 = require("@nestjs/common");
const monitoring_repository_1 = require("./monitoring.repository");
let MonitoringService = class MonitoringService {
    monitoringRepository;
    constructor(monitoringRepository) {
        this.monitoringRepository = monitoringRepository;
    }
    async createMonitoring(createMonitoringDto) {
        const result = await this.monitoringRepository.createMonitoring(createMonitoringDto);
        return { message: 'monitoria criado com sucesso', result };
    }
    async findAllMonitoring(page) {
        const result = await this.monitoringRepository.findAllMonitoring(page);
        if (!result)
            throw new common_1.NotFoundException('monitoria nao encontrada');
        return { message: 'monitorias encontradas com sucesso', result };
    }
    async findMonitoring(name, page) {
        const result = await this.monitoringRepository.findMonitoring(name, page);
        if (!result)
            throw new common_1.NotFoundException('monitoria nao encontrada');
        return { message: 'monitorias encontradas com sucesso', result };
    }
    async updateMonitoring(id, updateMonitoringDto) {
        const monitoringExists = await this.monitoringRepository.findById(id);
        if (!monitoringExists)
            throw new common_1.NotFoundException('Nao existe essa monitoria');
        const result = await this.monitoringRepository.updateMonitoring(id, updateMonitoringDto);
        return { message: 'monitoria editada com sucesso', result };
    }
    async disableMonitoring(id) {
        const monitoringExists = await this.monitoringRepository.findById(id);
        if (!monitoringExists)
            throw new common_1.NotFoundException('Nao existe essa monitoria');
        const result = await this.monitoringRepository.disableMonitoring(id);
        return { message: 'monitoria deletada com sucesso', result };
    }
};
exports.MonitoringService = MonitoringService;
exports.MonitoringService = MonitoringService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [monitoring_repository_1.MonitoringRepository])
], MonitoringService);
//# sourceMappingURL=monitoring.service.js.map