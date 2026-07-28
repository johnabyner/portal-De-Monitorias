import { CreateScheduleDto } from './create-schedule.dto';
declare const UpdateScheduleDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateScheduleDto>>;
export declare class UpdateScheduleDto extends UpdateScheduleDto_base {
    readonly dia_semana: string;
    readonly hora_inicio: string;
    readonly hora_fim: string;
}
export {};
