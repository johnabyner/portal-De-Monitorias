import { OnModuleInit } from '@nestjs/common';
export declare class DatabaseService implements OnModuleInit {
    private pool;
    onModuleInit(): Promise<void>;
    query(text: string, params?: any[]): Promise<any>;
}
