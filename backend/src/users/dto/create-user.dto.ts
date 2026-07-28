import { IsString, IsNotEmpty, MinLength, IsEnum, IsEmail } from "class-validator";
import { Sexo } from '../enums/Sexo.enum';
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        description: 'Matrícula do usuário.',
        example: '2023123456',
    })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => String(value).trim()) //transforma em string e tira os espaços
    readonly matricula!: string;

    @ApiProperty({
        description: 'Nome completo do usuário.',
        example: 'João Silva',
    })
    @IsString()
    @IsNotEmpty()
    readonly nome!: string;

    @ApiProperty({
        description: 'Email do usuário.',
        example: 'joao@email.com',
    })
    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    readonly email!: string;

    @ApiProperty({
        description: 'Sexo do usuário.',
        enum: Sexo,
        example: Sexo.masculino,
    })
    @IsEnum(Sexo)
    @IsNotEmpty()
    @Transform(({ value }) => value.trim().toLowerCase())
    readonly sexo!: Sexo;

    @ApiProperty({
        description: 'Senha do usuário.',
        example: 'senha123',
        minLength: 5,
    })
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