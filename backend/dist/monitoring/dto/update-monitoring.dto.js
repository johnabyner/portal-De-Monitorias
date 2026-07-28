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
exports.UpdateMonitoringDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_monitoring_dto_1 = require("./create-monitoring.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const Status_enum_1 = require("../enums/Status.enum");
const swagger_1 = require("@nestjs/swagger");
class UpdateMonitoringDto extends (0, mapped_types_1.PartialType)(create_monitoring_dto_1.CreateMonitoringDto) {
    disciplina_id;
    monitor_matricula;
    local;
    descricao;
    status;
}
exports.UpdateMonitoringDto = UpdateMonitoringDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID da disciplina',
        example: 1
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateMonitoringDto.prototype, "disciplina_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Matricula do monitor',
        example: '20230001'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    __metadata("design:type", String)
], UpdateMonitoringDto.prototype, "monitor_matricula", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Local da monitoria',
        example: 'Bliblioteca'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMonitoringDto.prototype, "local", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Descricao da monitoria',
        example: 'leve seu material'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMonitoringDto.prototype, "descricao", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Status da monitoria',
        enum: Status_enum_1.Status,
        example: 'ATIVA'
    }),
    (0, class_transformer_1.Transform)(({ value }) => value.toUpperCase()),
    (0, class_validator_1.IsEnum)(Status_enum_1.Status),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateMonitoringDto.prototype, "status", void 0);
//# sourceMappingURL=update-monitoring.dto.js.map