import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class LoginAuthDto {
    @ApiProperty({
        description: 'Matricula do usuário',
        example: '20230001',
    })
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => String(value).trim()) //transforma em string e tira os espaços
    readonly matricula!: string;

    @ApiProperty({
        description: 'Senha do usuario',
        example: 'euamolinux'
    })
    @IsNotEmpty()
    @IsString()
    readonly senha!: string;
}
