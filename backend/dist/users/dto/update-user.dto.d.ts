import { CreateUserDto } from './create-user.dto';
import { Sexo } from '../enums/Sexo.enum';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    readonly nome?: string;
    readonly email?: string;
    readonly sexo?: Sexo;
    readonly senha?: string;
}
export {};
