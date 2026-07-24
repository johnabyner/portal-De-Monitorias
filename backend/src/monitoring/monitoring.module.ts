import { Module } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { MonitoringController } from './monitoring.controller';
import { MonitoringRepository } from './monitoring.repository';
import { DatabaseService } from '../database/database.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthModule } from '../auth/auth.module';
import { UsersRepository } from '../users/users.repository';

@Module({
  imports:[AuthModule ],
  controllers: [MonitoringController],
  providers: [MonitoringService, MonitoringRepository, DatabaseService,JwtAuthGuard,RolesGuard,UsersRepository],
})
export class MonitoringModule {}
