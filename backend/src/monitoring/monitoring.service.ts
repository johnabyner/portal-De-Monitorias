import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMonitoringDto } from './dto/create-monitoring.dto';
import { UpdateMonitoringDto } from './dto/update-monitoring.dto';
import { MonitoringRepository } from './monitoring.repository';

@Injectable()
export class MonitoringService {
  constructor(private readonly monitoringRepository: MonitoringRepository){}

  async createMonitoring(createMonitoringDto: CreateMonitoringDto) {
    const result = await this.monitoringRepository.createMonitoring(createMonitoringDto);

    return {message: 'monitoria criado com sucesso', result};
  }

  async findAllMonitoring(page: number) {
    const result = await this.monitoringRepository.findAllMonitoring(page);
    if(!result) throw new NotFoundException('monitoria nao encontrada');

    return {message:'monitorias encontradas com sucesso', result};
  }
  async findMonitoring(name: string, page: number) {
    const result = await this.monitoringRepository.findMonitoring(name,page);
    if(!result) throw new NotFoundException('monitoria nao encontrada');

    return {message:'monitorias encontradas com sucesso', result};
  }

  async updateMonitoring(id: number, updateMonitoringDto: UpdateMonitoringDto) {
    //verificar se existe essa monitoria cadastrada
    const monitoringExists = await this.monitoringRepository.findById(id);
    if(!monitoringExists) throw new NotFoundException('Nao existe essa monitoria');

    const result = await this.monitoringRepository.updateMonitoring(id,updateMonitoringDto);

    return {message: 'monitoria editada com sucesso', result};
  }

  async disableMonitoring(id: number) {
    //verificar se existe essa monitoria cadastrada
    const monitoringExists = await this.monitoringRepository.findById(id);
    if(!monitoringExists) throw new NotFoundException('Nao existe essa monitoria');

    const result = await this.monitoringRepository.disableMonitoring(id);

    return {message: 'monitoria deletada com sucesso', result};
  }
}
