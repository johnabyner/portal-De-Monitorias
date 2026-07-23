import { Module } from '@nestjs/common';
import { DisciplinesRepository } from './disciplines.repository';
import { DatabaseService } from '../database/database.service';

@Module({
    providers:[DatabaseService],
    exports:[DisciplinesRepository]
})
export class DisciplinesModule {}
