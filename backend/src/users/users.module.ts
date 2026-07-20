import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { DatabaseService } from '../database/database.service';
import {JwtModule} from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, DatabaseService],
})

export class UsersModule{}