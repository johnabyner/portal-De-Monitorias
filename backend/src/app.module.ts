import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MonitoringModule } from './monitoring/monitoring.module';
import { SchedulesModule } from './schedules/schedules.module';
import { DisciplinesModule } from './disciplines/disciplines.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    AuthModule, UsersModule,MonitoringModule,SchedulesModule, DisciplinesModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities:true,
      synchronize:true,
      ssl:{
        rejectUnauthorized: false,
      },
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
