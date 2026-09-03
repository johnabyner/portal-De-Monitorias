import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { DisciplinesRepository } from './disciplines.repository';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';
import { RolesEnum } from '../auth/enums/Roles.enum';

@Injectable()
export class DisciplinesService {
  constructor(
    private readonly disciplinesRepository: DisciplinesRepository,
  ) {}

  async createDiscipline(
    createDisciplineDto: CreateDisciplineDto,
    user: any,
  ) {
    const matricula = user.sub;

    const result = await this.disciplinesRepository.createDiscipline(
      matricula,
      createDisciplineDto.curso,
      createDisciplineDto.descricao,
    );

    return {
      message: 'disciplina criada com sucesso',
      result,
    };
  }

  async findAllDisciplines() {
    const result = await this.disciplinesRepository.findAllDisciplines();

    return {
      message: 'disciplinas encontradas com sucesso',
      result,
    };
  }

  async findDiscipline(query: string) {
    const result =await this.disciplinesRepository.findDiscipline(query);

    return {
      message: 'disciplinas encontradas com sucesso',
      result,
    };
  }

  async updateDiscipline(
    id: number,
    updateDisciplineDto: UpdateDisciplineDto,
    user: any,
  ) {
    // Verificar se a disciplina existe
    const disciplineExists = await this.disciplinesRepository.findById(id);

    if (!disciplineExists) {
      throw new NotFoundException('Disciplina nao encontrada');
    }

    // Professor só pode editar sua própria disciplina
    if (user.role === RolesEnum.PROFESSOR) {
      if (disciplineExists.professor_matricula !== user.sub) {
        throw new ForbiddenException(
          'Voce nao pode editar essa disciplina',
        );
      }

      // Professor não altera o professor da disciplina
      updateDisciplineDto = {
        curso: updateDisciplineDto.curso,
        descricao: updateDisciplineDto.descricao,
      };
    }

    const result =
      await this.disciplinesRepository.updateDiscipline(
        updateDisciplineDto,
        id,
      );

    return {
      message: 'disciplina editada com sucesso',
      result,
    };
  }

  async deleteDiscipline(id: number, user: any) {
    // Verificar se a disciplina existe
    const disciplineExists =
      await this.disciplinesRepository.findById(id);

    if (!disciplineExists) {
      throw new NotFoundException('Disciplina nao encontrada');
    }

    // Professor só pode excluir sua própria disciplina
    if (user.role === RolesEnum.PROFESSOR) {
      if (disciplineExists.professor_matricula !== user.sub) {
        throw new ForbiddenException(
          'Voce nao pode deletar essa disciplina',
        );
      }
    }

    const result =
      await this.disciplinesRepository.deleteDiscipline(id);

    return {
      message: 'disciplina deletada com sucesso',
      result,
    };
  }
}
