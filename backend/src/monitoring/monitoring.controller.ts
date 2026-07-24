import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { CreateMonitoringDto } from './dto/create-monitoring.dto';
import { UpdateMonitoringDto } from './dto/update-monitoring.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('monitoring')
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) {}
  //POST
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('professor', 'administrador')
  @Post()
  createMonitoring(@Body() createMonitoringDto: CreateMonitoringDto) {
    return this.monitoringService.createMonitoring(createMonitoringDto);
  }
  //GET
  @Get()
  findAllMonitoring(@Query('page', ParseIntPipe) page = 0,@Query('name') name:string) {
    if(name){ //se existir o parametro nome
      return this.monitoringService.findMonitoring(name, page);
    }

    return this.monitoringService.findAllMonitoring(page);
  }
  //PATCH
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('professor','administrador')
  @Patch(':id')
  updateMonitoring(@Param('id', ParseIntPipe) id: number, @Body() updateMonitoringDto: UpdateMonitoringDto) {
    return this.monitoringService.updateMonitoring(id, updateMonitoringDto);
  }
  
  //DELETE
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('professor','administrador')
  @Delete(':id')
  disableMonitoring(@Param('id', ParseIntPipe) id: number) {
    return this.monitoringService.disableMonitoring(id);
  }
}

// disciplina_id
// monitor_matricula
// professor_matricula
// local
// descricao
// status
//DEFAULT 'ATIVA'