import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDisciplineDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  readonly professor_matricula?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  readonly curso?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  readonly descricao?: string;
}