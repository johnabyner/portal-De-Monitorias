import { Transform } from "class-transformer";
import { IsEmail, IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class LoginAuthDto {
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => String(value).trim()) //transforma em string e tira os espaços
    readonly matricula!: string;

    @IsNotEmpty()
    @IsString()
    readonly senha!: string;
}
