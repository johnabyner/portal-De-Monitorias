import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';

import { DisciplinesService } from './disciplines.service';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RolesEnum } from '../auth/enums/Roles.enum';
import { Roles } from '../auth/decorators/roles.decorator';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('disciplines')
@Controller('disciplines')
export class DisciplinesController {
  constructor(
    private readonly disciplinesService: DisciplinesService,
  ) {}

  // =========================
  // CREATE
  // =========================

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cadastrar disciplina' })
  @ApiBody({
    type: CreateDisciplineDto,
    description: 'Detalhes para cadastrar uma disciplina',
    examples: {
      disciplina: {
        summary: 'Exemplo de cadastro de disciplina',
        value: {
          curso: 'Algoritmos 2',
          descricao: 'Disciplina de algoritmos e estruturas de dados',
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.PROFESSOR, RolesEnum.ADMINISTRADOR)
  @Post()
  createDiscipline(
    @Body() createDisciplineDto: CreateDisciplineDto,
    @Request() request,
  ) {
    return this.disciplinesService.createDiscipline(
      createDisciplineDto,
      request.user,
    );
  }

  // =========================
  // READ
  // =========================

  @ApiOperation({ summary: 'Listar disciplinas' })
  @ApiQuery({
    name: 'name',
    example: 'matematica',
    required: false,
  })
  @Get()
  findAllDisciplines(
    @Query('name') name?: string,
  ) {
    if (name) {
      return this.disciplinesService.findDiscipline(
        name
      );
    }

    return this.disciplinesService.findAllDisciplines();
  }

  // =========================
  // UPDATE
  // =========================

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar disciplina' })
  @ApiParam({
    name: 'id',
    example: 1,
  })
  @ApiBody({
    type: UpdateDisciplineDto,
    description: 'Detalhes para atualizar uma disciplina',
    examples: {
      disciplina: {
        summary: 'Exemplo de atualização de disciplina',
        value: {
          curso: 'Algoritmos 2',
          descricao: 'Nova descrição da disciplina',
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.PROFESSOR, RolesEnum.ADMINISTRADOR)
  @Patch(':id')
  updateDiscipline(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDisciplineDto: UpdateDisciplineDto,
    @Request() request,
  ) {
    return this.disciplinesService.updateDiscipline(
      id,
      updateDisciplineDto,
      request.user,
    );
  }

  // =========================
  // DELETE
  // =========================

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deletar disciplina' })
  @ApiParam({
    name: 'id',
    example: 1,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.PROFESSOR, RolesEnum.ADMINISTRADOR)
  @Delete(':id')
  deleteDiscipline(
    @Param('id', ParseIntPipe) id: number,
    @Request() request,
  ) {
    return this.disciplinesService.deleteDiscipline(
      id,
      request.user,
    );
  }
}
