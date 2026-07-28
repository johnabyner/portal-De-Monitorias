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
exports.CreateMonitoringDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateMonitoringDto {
    disciplina_id;
    monitor_matricula;
    professor_matricula;
    local;
    descricao;
    status;
}
exports.CreateMonitoringDto = CreateMonitoringDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID da disciplina vinculada à monitoria.',
        example: 1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateMonitoringDto.prototype, "disciplina_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Matrícula do monitor. Normalmente preenchida automaticamente após autenticação.',
        example: '2023123456',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], CreateMonitoringDto.prototype, "monitor_matricula", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Matrícula do professor responsável pela monitoria.',
        example: '2020987654',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim()),
    __metadata("design:type", String)
], CreateMonitoringDto.prototype, "professor_matricula", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Local onde a monitoria será realizada.',
        example: 'Laboratório 03',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMonitoringDto.prototype, "local", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Descrição ou informações adicionais da monitoria.',
        example: 'Monitoria de algoritmos voltada para listas de exercícios.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMonitoringDto.prototype, "descricao", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Status da monitoria.',
        example: 'ATIVA',
        default: 'ATIVA',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMonitoringDto.prototype, "status", void 0);
//# sourceMappingURL=create-monitoring.dto.js.map