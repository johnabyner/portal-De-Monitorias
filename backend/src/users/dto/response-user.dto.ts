import { Expose } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiPropertyOptional({
    description: 'Matrícula do usuário.',
    example: '2023123456',
  })
  @Expose()
  readonly matricula?: string;

  @ApiPropertyOptional({
    description: 'Nome completo do usuário.',
    example: 'João Silva',
  })
  @Expose()
  readonly nome?: string;

  @ApiPropertyOptional({
    description: 'Email do usuário.',
    example: 'joao@email.com',
  })
  @Expose()
  readonly email?: string;

  @ApiPropertyOptional({
    description: 'Sexo do usuário.',
    example: 'masculino',
  })
  @Expose()
  readonly sexo?: string;
}