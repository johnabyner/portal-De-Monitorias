import { MonitoringService } from './monitoring.service';
import { CreateMonitoringDto } from './dto/create-monitoring.dto';
import { UpdateMonitoringDto } from './dto/update-monitoring.dto';
export declare class MonitoringController {
    private readonly monitoringService;
    constructor(monitoringService: MonitoringService);
    createMonitoring(createMonitoringDto: CreateMonitoringDto): Promise<{
        message: string;
        result: any;
    }>;
    findAllMonitoring(page?: number, name?: string): Promise<{
        message: string;
        result: any;
    }>;
    updateMonitoring(id: number, updateMonitoringDto: UpdateMonitoringDto): Promise<{
        message: string;
        result: any;
    }>;
    disableMonitoring(id: number): Promise<{
        message: string;
        result: any;
    }>;
}
