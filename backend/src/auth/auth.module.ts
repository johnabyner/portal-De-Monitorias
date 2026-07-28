import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { jwtAuthService } from './JwtAuth.service';
import { DatabaseService } from '../database/database.service';
import { Roles } from './decorators/roles.decorator';

@Module({
  imports: [
    JwtModule.register({}), 
  ],
  controllers: [AuthController],
  providers: [AuthService,DatabaseService, jwtAuthService,UsersRepository],
  exports: [jwtAuthService, Roles],
})
export class AuthModule {}
