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
exports.UpdateScheduleDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_schedule_dto_1 = require("./create-schedule.dto");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const daysOfTheWeek_enum_1 = require("../enums/daysOfTheWeek.enum");
class UpdateScheduleDto extends (0, mapped_types_1.PartialType)(create_schedule_dto_1.CreateScheduleDto) {
    dia_semana;
    hora_inicio;
    hora_fim;
}
exports.UpdateScheduleDto = UpdateScheduleDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Novo dia da semana em que a monitoria ocorrerá.',
        enum: daysOfTheWeek_enum_1.daysOfTheWeek,
        example: daysOfTheWeek_enum_1.daysOfTheWeek.segunda,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(daysOfTheWeek_enum_1.daysOfTheWeek),
    __metadata("design:type", String)
], UpdateScheduleDto.prototype, "dia_semana", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Novo horário de início da monitoria no formato HH:mm.',
        example: '08:30',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Hora deve estar no formato HH:mm',
    }),
    __metadata("design:type", String)
], UpdateScheduleDto.prototype, "hora_inicio", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Novo horário de término da monitoria no formato HH:mm.',
        example: '10:00',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Hora deve estar no formato HH:mm',
    }),
    __metadata("design:type", String)
], UpdateScheduleDto.prototype, "hora_fim", void 0);
//# sourceMappingURL=update-schedule.dto.js.map