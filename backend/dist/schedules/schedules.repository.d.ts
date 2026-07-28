import { DatabaseService } from "../database/database.service";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { UpdateScheduleDto } from "./dto/update-schedule.dto";
export declare class SchedulesRepository {
    private readonly db;
    constructor(db: DatabaseService);
    createSchedule(createSchedule: CreateScheduleDto): Promise<any>;
    existsMonitoringOnDay(monitoria_id: number, dia_semana: string): Promise<any>;
    existsMonitoring(monitoria_id: number): Promise<any>;
    existsSchedule(id: number): Promise<any>;
    findAllSchedules(page: number): Promise<any>;
    findSchedules(name: string, page: number): Promise<any>;
    updateSchedules(id: number, updateScheduleDto: UpdateScheduleDto): Promise<any>;
    deleteSchedule(id: number): Promise<any>;
}
