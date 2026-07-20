import { Expose, plainToInstance } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  readonly matricula?: string;

  @Expose()
  readonly nome?: string;

  @Expose()
  readonly email?: string;

  @Expose()
  readonly sexo?: string;

}
