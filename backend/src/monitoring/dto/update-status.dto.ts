import { ApiPropertyOptional } from "@nestjs/swagger";
import { Status } from "../enums/Status.enum";
import { Transform } from "class-transformer";
import { IsEnum, IsString } from "class-validator";

export class UpdateStatusDto {
    @ApiPropertyOptional({
        description: 'Status da monitoria',
        enum: Status,
        example: 'ATIVA'
    })
    @Transform(({value})=> value?.toUpperCase())
    @IsEnum(Status)
    @IsString()
    readonly status?: string;
}