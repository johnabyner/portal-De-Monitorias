import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { AuthService } from '../auth/auth.service';
import { jwtAuthService } from '../auth/JwtAuth.service';
import { AuthModule } from '../auth/auth.module';
import { DatabaseService } from '../database/database.service';
import { FavoritesRepository } from './favorites.repository';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersRepository } from '../users/users.repository';

@Module({
  imports: [AuthModule],
  controllers: [FavoritesController],
  providers: [FavoritesService, DatabaseService, FavoritesRepository,JwtAuthGuard, RolesGuard,UsersRepository],
})
export class FavoritesModule {}
