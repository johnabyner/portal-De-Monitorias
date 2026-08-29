import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RolesEnum } from '../auth/enums/Roles.enum';
import { Roles } from '../auth/decorators/roles.decorator';


@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  //SWAGGER
  @ApiBearerAuth()
  @ApiOperation({summary: 'Cadastrar horario'})
  @ApiBody({
    type: CreateScheduleDto,
    description: 'Detalhes do horario para cadastro',
    examples:{
      horario:{
        summary:'Exemplo de cadastro',
        value:{
          monitoria_id: 1,
          dia_semana: 'segunda',
          hora_inicio: '14:00',
          hora_fim: '15:00'
        }
      }
    }
  })
  //POST
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.PROFESSOR, RolesEnum.ADMINISTRADOR, RolesEnum.MONITOR)  
  @Post()
  createSchedule(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.createSchedule(createScheduleDto);
  }

  //SWAGGER
  @ApiOperation({summary: 'Listar horarios'})
  @ApiQuery({name:'page',example:0,required:false})
  @ApiQuery({name:'name', example: 'segunda', required:false})

  //GET
  @Get('')
  get(@Query('page') page = 0,@Query('name') name?: string) {
    if(name){
      return this.schedulesService.findSchedules(name, page)
    }
    return this.schedulesService.findAllSchedules(page);
  }

  //SWAGGER
  @ApiBearerAuth()
  @ApiOperation({summary: 'Atualizar horario'})
  @ApiParam({name:'id', example: 1})
  @ApiBody({
    type: UpdateScheduleDto,
    description: 'Detalhes do horario para atualizar',
    examples:{
      horario:{
        summary:'Exemplo de atualizaçao',
        value:{
          dia_semana: 'segunda',
          hora_inicio: '14:00',
          hora_fim: '16:00'
        }
      }
    }
  })
  
  //PATCH
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.PROFESSOR, RolesEnum.ADMINISTRADOR, RolesEnum.MONITOR) 
  @Patch(':id')
  updateSchedule(@Param('id',ParseIntPipe) id: number, @Body() updateScheduleDto: UpdateScheduleDto) {
    return this.schedulesService.updateSchedule(id, updateScheduleDto);
  }

  //SWAGGER
  @ApiBearerAuth()
  @ApiParam({name:'id', example: 1})
  //DELETE
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.PROFESSOR, RolesEnum.ADMINISTRADOR, RolesEnum.MONITOR) 
  @Delete(':id')
  deleteSchedule(@Param('id',ParseIntPipe) id: number) {
    return this.schedulesService.deleteSchedule(id);
  }
}
