import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersRepository } from '../../users/users.repository';
export declare class RolesGuard implements CanActivate {
    private reflector;
    private usersRepository;
    constructor(reflector: Reflector, usersRepository: UsersRepository);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
