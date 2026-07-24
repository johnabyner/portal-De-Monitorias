import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMonitoringDto {
    @IsNotEmpty()
    @IsNumber()
    readonly disciplina_id? : number;

    @IsOptional()
    @IsString()
    @Transform(({value})=> value?.trim())
    readonly monitor_matricula?: string;
    
    @IsNotEmpty()
    @IsString()
    @Transform(({value})=> value?.trim())
    readonly professor_matricula?: string;

    @IsOptional()
    @IsString()
    readonly local?: string;

    @IsOptional()
    @IsString()
    readonly descricao?: string;

    @IsOptional()
    @IsString()
    readonly status?: string;
}

//disciplina_id
// monitor_matricula
// professor_matricula
// local
// descricao
// status
//DEFAULT 'ATIVA'
//