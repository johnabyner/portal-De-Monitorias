import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles'; //nome do decorator
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles); //vai aceitar qualquer quant de strings,
//primeiro e a key(nome do decorator), e dps e os permitidos q vao vim de parametro