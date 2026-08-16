import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMonitoringDto {
  @ApiProperty({
    description: 'ID da disciplina vinculada à monitoria.',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly disciplina_id?: number;

  @ApiPropertyOptional({
    description: 'Nome da monitoria.',
    example: 'algoritmos',
  })
  @IsString()
  readonly nome?: string;

  @ApiPropertyOptional({
    description: 'Matrícula do monitor. Normalmente preenchida automaticamente após autenticação.',
    example: '2023123456',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  readonly monitor_matricula?: string;

  @ApiProperty({
    description: 'Matrícula do professor responsável pela monitoria.',
    example: '2020987654',
  })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  readonly professor_matricula?: string;

  @ApiPropertyOptional({
    description: 'Local onde a monitoria será realizada.',
    example: 'Laboratório 03',
  })
  @IsOptional()
  @IsString()
  readonly local?: string;

  @ApiPropertyOptional({
    description: 'Descrição ou informações adicionais da monitoria.',
    example: 'Monitoria de algoritmos voltada para listas de exercícios.',
  })
  @IsOptional()
  @IsString()
  readonly descricao?: string;

  @ApiPropertyOptional({
    description: 'Status da monitoria.',
    example: 'ATIVA',
    default: 'ATIVA',
  })
  @IsOptional()
  @IsString()
  readonly status?: string;
}

//disciplina_id
//nome
// monitor_matricula
// professor_matricula
// local
// descricao
// status
//DEFAULT 'ATIVA'
//