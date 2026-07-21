import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UsersRepository } from '../../users/users.repository';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector, //Serve para ler os decorators.
    private usersRepository: UsersRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>( //Lendo o decorator
      ROLES_KEY, //exemplo: @Roles('professor')
      [
        context.getHandler(), //exemplo: @Get()
        context.getClass(), //exemplo: findAllUsers(){}
      ],
    );

    if (!requiredRoles) { //se nao tiver nenhum parametro no roles pode passar
      return true;
    }

    const request = context.switchToHttp().getRequest(); //pega o req

    const payload = request.user; 

    const user = await this.usersRepository.findByRegistration(
      payload.sub,
    );

    if (!user) { //se nao tiver um user com essa matricula
      throw new ForbiddenException();
    }

    if (!requiredRoles.includes(user.role)) { //se nao tiver as roles descritas
      throw new ForbiddenException(
        'Você não possui permissão para acessar esta rota.',
      );
    }

    return true;
  }
}