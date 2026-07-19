import { PartialType } from '@nestjs/mapped-types';
import { loginAuthDto } from './loginAuthDto';

export class UpdateAuthDto extends PartialType(loginAuthDto) {}
