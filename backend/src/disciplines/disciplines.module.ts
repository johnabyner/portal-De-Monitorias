import { Module } from '@nestjs/common';
import { DisciplinesRepository } from './disciplines.repository';
import { DatabaseService } from '../database/database.service';
import { DisciplinesController } from './disciplines.controller';
import { DisciplinesService } from './disciplines.service';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UsersRepository } from '../users/users.repository';


@Module({
    imports: [AuthModule],
    controllers:[DisciplinesController],
    providers:[DatabaseService,DisciplinesRepository, DisciplinesService, JwtAuthGuard,RolesGuard,UsersRepository],
    exports:[DisciplinesRepository]
})
export class DisciplinesModule {}
