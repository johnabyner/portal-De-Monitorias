import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { jwtAuthService } from '../JwtAuth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: jwtAuthService) {}
  //vai verificar se o usuario pode passar
  async canActivate(context: ExecutionContext) { //pega como parametro o contexto da execução
    const request = context.switchToHttp().getRequest<Request>(); //troca para http
    //retornao objeto request do express

    const token = this.jwtService.extractToken(request); //extrai o token do req
    if (!token) {
      throw new UnauthorizedException('Token não informado');
    }

    request['user'] = await this.jwtService.verifyAccessToken(token);  //vai salvar no request se e verdadeiro
    return true;
  }
}