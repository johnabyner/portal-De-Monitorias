import { PartialType } from '@nestjs/mapped-types';
import { CreateMonitoringDto } from './create-monitoring.dto';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { Status } from '../enums/Status.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMonitoringDto extends PartialType(CreateMonitoringDto) {

    @ApiProperty({
        description: 'ID da disciplina',
        example: 1
    })
    @IsNotEmpty()
    @IsNumber()
    readonly disciplina_id? : number;

    @ApiPropertyOptional({
        description: 'Nome da monitoria',
        example: 'Monitoria de Sociologia'
    })
    @IsString()
    @Transform(({value}) => value?.trim())
    readonly nome?: string;

    @ApiPropertyOptional({
        description: 'Matricula do monitor',
        example: '20230001'
    })
    @IsString()
    @Transform(({value})=> value?.trim())
    readonly monitor_matricula?: string;

    @ApiPropertyOptional({
        description: 'Local da monitoria',
        example: 'Bliblioteca'
    })
    @IsString()
    readonly local?: string;

    @ApiPropertyOptional({
        description: 'Descricao da monitoria',
        example: 'leve seu material'
    })
    @IsString()
    readonly descricao?: string;


}
