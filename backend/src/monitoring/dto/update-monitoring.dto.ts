import { PartialType } from '@nestjs/mapped-types';
import { CreateMonitoringDto } from './create-monitoring.dto';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { Status } from '../enums/Status.enum';

export class UpdateMonitoringDto extends PartialType(CreateMonitoringDto) {
    @IsNotEmpty()
    @IsNumber()
    readonly disciplina_id? : number;

    @IsString()
    @Transform(({value})=> value.trim())
    readonly monitor_matricula?: string;

    @IsString()
    readonly local?: string;

    @IsString()
    readonly descricao?: string;

    @Transform(({value})=> value.toUpperCase())
    @IsEnum(Status)
    @IsString()
    readonly status?: string;
}
