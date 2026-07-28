import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { DatabaseService } from '../database/database.service';
import { SchedulesRepository } from './schedules.repository';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UsersRepository } from '../users/users.repository';
import { RolesEnum } from '../auth/enums/Roles.enum';

@Module({
  imports:[AuthModule],
  controllers: [SchedulesController],
  providers: [SchedulesService, DatabaseService, SchedulesRepository,JwtAuthGuard,RolesGuard,UsersRepository],
})
export class SchedulesModule {}
