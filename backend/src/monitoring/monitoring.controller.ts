import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards, Request } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { CreateMonitoringDto } from './dto/create-monitoring.dto';
import { UpdateMonitoringDto } from './dto/update-monitoring.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from '../auth/enums/Roles.enum';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('monitoring') //swagger
@Controller('monitoring')
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) {}
  
  //SWAGGER
  @ApiBearerAuth()
  @ApiOperation({summary: 'Cadastrar monitoria'})
  @ApiBearerAuth()
  @ApiBody({
    type:CreateMonitoringDto,
    description:'Detalhes para cadastrar uma monitoria',
    examples:{
      monitoria:{
        summary:'exemplo de cadastro de monitoria',
        value:{
          disciplina_id: 1,
          nome: 'sociologia',
          monitor_matricula: '20230001',
          professor_matricula: '20230001',
          local: 'bliblioteca',
          descricao: 'avise antes',
          status: 'ATIVA'
        }
      }
    }
  })
  //POST
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.PROFESSOR, RolesEnum.ADMINISTRADOR)
  @Post()
  createMonitoring(@Body() createMonitoringDto: CreateMonitoringDto) {
    return this.monitoringService.createMonitoring(createMonitoringDto);
  }

  //SWAGGER
  @ApiOperation({summary: 'Listar monitorias'})
  @ApiQuery({name:'page', example: 0, required: false})
  @ApiQuery({name:'name', example: 'matematica', required: false})

  //GET
  @Get()
  findAllMonitoring(@Query('page', ParseIntPipe) page = 0,@Query('name') name?:string) {
    if(name){ //se existir o parametro nome
      return this.monitoringService.findMonitoring(name, page);
    }

    return this.monitoringService.findAllMonitoring(page);
  }

  //SWAGGER
  @ApiBearerAuth()
  @ApiOperation({summary: 'Atualizar monitoria'})
  @ApiBearerAuth()
  @ApiParam({name:'id', example:1})
  @ApiBody({
    type: UpdateMonitoringDto,
    description:'Detalhes para atualizar uma monitoria',
    examples:{
      monitoria:{
        summary: 'Exemplo de atualizaçao de uma monitoria',
        value:{
          disciplina_id: 1,
          monitor_matricula: '20230001',
          local: 'bliblioteca',
          descricao: 'venha com seu material',
          status: 'ATIVA'
        }
      }
    }
  })
  //PATCH
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.PROFESSOR, RolesEnum.MONITOR,RolesEnum.ADMINISTRADOR)  
  @Patch(':id')
  updateMonitoring(@Param('id', ParseIntPipe) id: number, @Body() updateMonitoringDto: UpdateMonitoringDto, @Request() request) {
    return this.monitoringService.updateMonitoring(id, updateMonitoringDto, request.user);
  }
  
  //SWAGGER
  @ApiBearerAuth()
  @ApiOperation({summary: 'Deletar monitoria'})
  @ApiBearerAuth()
  @ApiParam({name:'id', example:1})
  //DELETE
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.PROFESSOR, RolesEnum.ADMINISTRADOR)  
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