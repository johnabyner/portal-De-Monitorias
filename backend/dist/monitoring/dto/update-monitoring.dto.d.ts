import { CreateMonitoringDto } from './create-monitoring.dto';
declare const UpdateMonitoringDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateMonitoringDto>>;
export declare class UpdateMonitoringDto extends UpdateMonitoringDto_base {
    readonly disciplina_id?: number;
    readonly monitor_matricula?: string;
    readonly local?: string;
    readonly descricao?: string;
    readonly status?: string;
}
export {};
