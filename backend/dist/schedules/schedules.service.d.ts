import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { SchedulesRepository } from './schedules.repository';
export declare class SchedulesService {
    private readonly schedulesRepository;
    constructor(schedulesRepository: SchedulesRepository);
    createSchedule(createScheduleDto: CreateScheduleDto): Promise<{
        message: string;
        result: any;
    }>;
    findAllSchedules(page: number): Promise<{
        message: string;
        result: any;
    }>;
    findSchedules(name: string, page: number): Promise<{
        message: string;
        result: any;
    }>;
    updateSchedule(id: number, updateScheduleDto: UpdateScheduleDto): Promise<{
        message: string;
    }>;
    deleteSchedule(id: number): Promise<{
        message: string;
        result: any;
    }>;
}
