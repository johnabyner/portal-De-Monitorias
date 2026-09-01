import { IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { RolesEnum } from "../../auth/enums/Roles.enum";
import { Transform } from "class-transformer";

export class UpdateRoleDto{
    @ApiProperty({
        description: 'Role do usuario',
        enum: RolesEnum,
        example: RolesEnum.ALUNO
    })
    @IsEnum(RolesEnum)
    @Transform(({ value }) => value.trim().toLowerCase())
    readonly role!: RolesEnum;
 
}