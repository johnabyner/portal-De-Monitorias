import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { daysOfTheWeek } from "../enums/daysOfTheWeek.enum";

export class CreateScheduleDto {
    @ApiProperty({
        description: 'ID da monitoria vinculada ao horário.',
        example: 1,
    })
    @IsNotEmpty()
    @IsNumber()
    readonly monitoria_id!: number;

    @ApiProperty({
        description: 'Dia da semana em que a monitoria ocorrerá.',
        enum: daysOfTheWeek,
        example: daysOfTheWeek.segunda,
    })
    @IsNotEmpty()
    @IsEnum(daysOfTheWeek)
    readonly dia_semana!: string;

    @ApiProperty({
        description: 'Horário de início da monitoria no formato HH:mm.',
        example: '08:30',
    })
    @IsNotEmpty()
    //pode ser o primeiro ou o segundo
    //o primeiro aceita apenas de 0 ou 1 na primeira casa
    //o segundo que aceita 2 na primeira casa so vai ate 3 na segunda casa
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Hora deve estar no formato HH:mm',
    })
    readonly hora_inicio!: string;

    @ApiProperty({
        description: 'Horário de término da monitoria no formato HH:mm.',
        example: '10:00',
    })
    @IsNotEmpty()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Hora deve estar no formato HH:mm',
    })
    readonly hora_fim!: string;
}