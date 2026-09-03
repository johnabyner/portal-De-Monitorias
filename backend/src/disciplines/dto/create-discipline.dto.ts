import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDisciplineDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  readonly curso!: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  readonly descricao!: string;
}