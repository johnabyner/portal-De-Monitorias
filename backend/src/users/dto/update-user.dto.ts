import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Sexo } from '../enums/Sexo.enum';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

//pode ser vazio porque as vezes o user so quer alterar uma coisa
export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiPropertyOptional({
        description: 'Novo nome do usuário.',
        example: 'João Silva',
    })
    @IsString()
    readonly nome?: string;

    @ApiPropertyOptional({
        description: 'Novo email do usuário.',
        example: 'joao@email.com',
    })
    @IsEmail()
    @Transform(({ value }) => value.trim())
    readonly email?: string;

    @ApiPropertyOptional({
        description: 'Novo sexo do usuário.',
        enum: Sexo,
        example: Sexo.masculino,
    })
    @IsEnum(Sexo)
    @Transform(({ value }) => value.trim().toLowerCase())
    readonly sexo?: Sexo;

    @ApiPropertyOptional({
        description: 'Nova senha do usuário.',
        example: 'novaSenha123',
        minLength: 5,
    })
    @IsString()
    @MinLength(5)
    @Transform(({ value }) => String(value).trim())
    readonly senha?: string
}