import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { DatabaseService } from '../database/database.service';
import {JwtModule, JwtService} from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { jwtAuthService } from '../auth/JwtAuth.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[AuthModule ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, DatabaseService,JwtAuthGuard,RolesGuard],
  exports: [UsersRepository]
})

export class UsersModule{}