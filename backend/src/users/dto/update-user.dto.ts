import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Sexo } from '../enums/Sexo.enum';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

//pode ser vazio porque as vezes o user so quer alterar uma coisa
export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    readonly nome?: string;

    @IsEmail()
    @Transform(({ value }) => value.trim())
    readonly email?: string;

    @IsEnum(Sexo)
    @Transform(({ value }) => value.trim().toLowerCase())
    readonly sexo?: Sexo;

    @IsString()
    @MinLength(5)
    @Transform(({ value }) => String(value).trim())
    readonly senha?: string
}
