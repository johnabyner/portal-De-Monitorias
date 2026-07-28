import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { SchedulesRepository } from './schedules.repository';

@Injectable()
export class SchedulesService {
  constructor(private readonly schedulesRepository: SchedulesRepository){}

  //CREATE
  async createSchedule(createScheduleDto: CreateScheduleDto){
    //verificar se existe essa monitoria
    const existsMonitoring = await this.schedulesRepository.existsMonitoring(createScheduleDto.monitoria_id);
    if(!existsMonitoring){
      throw new NotFoundException('Nao existe essa monitoria')
    }

    //ver se ja tem esse dia da semana na monitoria
    const alreadyExistsMonitoringInThatDay = await this.schedulesRepository.existsMonitoringOnDay(createScheduleDto.monitoria_id, createScheduleDto.dia_semana);
    if(alreadyExistsMonitoringInThatDay){
      throw new ConflictException('Ja existe uma monitoria nesse dia')
    }

    //verifar se a hora de inicio e maior q a hora de fim
    const horaInicio = Number(createScheduleDto.hora_inicio.replace(':', ''));
    const horaFim = Number(createScheduleDto.hora_fim.replace(':',''));
    if (horaInicio >= horaFim) {
      throw new BadRequestException('Hora de início deve ser menor que hora final');
    }

    //BD
    const result = await this.schedulesRepository.createSchedule(createScheduleDto);

    return {message: "Horario cadastrado com sucesso",result};
  }

  //GET
  async findAllSchedules(page: number) {
    const result = await this.schedulesRepository.findAllSchedules(page);
    return {message: 'Sucesso em encontrar todos os horarios', result};
  }
  async findSchedules(name: string, page: number) {
    const result = await this.schedulesRepository.findSchedules(name,page);
    return {message: 'sucesso em encontrar os horarios', result};
  }

  //UPDATE
  async updateSchedule(id: number, updateScheduleDto: UpdateScheduleDto) {
    //verificar se existe o horario
    const existsSchedule = this.schedulesRepository.existsSchedule(id);
    if(!existsSchedule){
      throw new NotFoundException('Horario nao encontrado')
    }

    const result = await this.schedulesRepository.updateSchedules(id,updateScheduleDto);
    return {message: 'Horario atualizado com sucesso'};
  }

  //DELETE
  async deleteSchedule(id: number) {
    //Verificar se existe o horario
    const existsSchedule = await this.schedulesRepository.existsSchedule(id);
    if(!existsSchedule){
      throw new NotFoundException('Horario nao encontrado')
    }

    const result = await this.schedulesRepository.deleteSchedule(id);
    return {message: "Horario deletado com sucesso", result};
  }
}
