import { CreateMonitoringDto } from './dto/create-monitoring.dto';
import { UpdateMonitoringDto } from './dto/update-monitoring.dto';
import { MonitoringRepository } from './monitoring.repository';
export declare class MonitoringService {
    private readonly monitoringRepository;
    constructor(monitoringRepository: MonitoringRepository);
    createMonitoring(createMonitoringDto: CreateMonitoringDto): Promise<{
        message: string;
        result: any;
    }>;
    findAllMonitoring(page: number): Promise<{
        message: string;
        result: any;
    }>;
    findMonitoring(name: string, page: number): Promise<{
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
