import { IsString ,IsNotEmpty, MinLength, IsEnum, IsEmail } from "class-validator";
import {Sexo} from '../enums/Sexo.enum';
import { Transform } from "class-transformer";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => String(value).trim()) //transforma em string e tira os espaços
    readonly matricula!: string;

    @IsString()
    @IsNotEmpty()
    readonly nome!: string;

    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    readonly email!: string;

    @IsEnum(Sexo)
    @IsNotEmpty()
    @Transform(({ value }) => value.trim().toLowerCase())
    readonly sexo!: Sexo;

    @IsString()
    @MinLength(5)
    @IsNotEmpty()
    readonly senha!: string
}

//matricula
//nome
//email
//sexo
//senha