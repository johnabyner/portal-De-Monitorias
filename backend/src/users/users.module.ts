import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, DatabaseService],
})

export class UsersModule{}