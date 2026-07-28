import { Sexo } from '../enums/Sexo.enum';
export declare class CreateUserDto {
    readonly matricula: string;
    readonly nome: string;
    readonly email: string;
    readonly sexo: Sexo;
    readonly senha: string;
}
