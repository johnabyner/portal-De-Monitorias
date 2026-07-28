import { DatabaseService } from "../database/database.service";
import { CreateMonitoringDto } from "./dto/create-monitoring.dto";
import { UpdateMonitoringDto } from "./dto/update-monitoring.dto";
export declare class MonitoringRepository {
    private readonly db;
    constructor(db: DatabaseService);
    createMonitoring(createMonitoringDto: CreateMonitoringDto): Promise<any>;
    findById(id: number): Promise<any>;
    findAllMonitoring(page: number): Promise<any>;
    findMonitoring(name: string, page: number): Promise<any>;
    updateMonitoring(id: number, updateMonitoringDto: UpdateMonitoringDto): Promise<any>;
    disableMonitoring(id: number): Promise<any>;
}
