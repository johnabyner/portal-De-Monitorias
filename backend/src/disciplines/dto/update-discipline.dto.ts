import { Transform } from "class-transformer";
import { IsEmpty, IsNotEmpty, IsString } from "class-validator"

export class UpdateDisciplineDto{
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.trim())
    professor_matricula
    
    @IsNotEmpty()
    @IsString()
    readonly curso?: string;

    @IsNotEmpty()
    @IsString()
    readonly descricao?: string;
};