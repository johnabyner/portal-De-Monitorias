import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
export declare class SchedulesController {
    private readonly schedulesService;
    constructor(schedulesService: SchedulesService);
    createSchedule(createScheduleDto: CreateScheduleDto): Promise<{
        message: string;
        result: any;
    }>;
    get(page?: number, name?: string): Promise<{
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
