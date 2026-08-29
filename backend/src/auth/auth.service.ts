import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.Dto';
import { UsersRepository } from '../users/users.repository';
import { jwtAuthService } from './JwtAuth.service';
import { Request } from 'express';
import * as argon2 from 'argon2';
import { RefreshTokenDto } from './dto/refresh-token.dto';


@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository, private readonly jwtAuthService: jwtAuthService){}

  async login(loginAuthDto: LoginAuthDto){
    //verificar se esta no bd
    const userExists = await this.usersRepository.findByRegistration(loginAuthDto.matricula);
    if(!userExists){ 
      throw new NotFoundException('Nao existe esse usuario')
    }
    
    const passwordIsCorrect = await argon2.verify(
      userExists.senha,
      loginAuthDto.senha,
    );
    if (!passwordIsCorrect) {
      throw new UnauthorizedException('Matrícula ou senha inválida');
    }

    //criar acessToken e refreshToken
    const payload = {sub: loginAuthDto.matricula, role: userExists.role};
    const acessToken = await this.jwtAuthService.createAcessToken(payload);
    const refreshToken = await this.jwtAuthService.createRefreshToken(payload);

    //se estiver atualiza o refresh no bd
    const result = await this.usersRepository.updateRefreshToken(loginAuthDto.matricula, refreshToken)

    return {message: 'usuario logado com sucesso', acessToken, refreshToken, result}
  }

  async refreshToken(refreshToken: string){
    //validar
    if (!refreshToken) {
      throw new UnauthorizedException('Token não enviado');
    }

    const payload = await this.jwtAuthService.verifyRefreshToken(refreshToken);
    //retornar acessToken
    const matricula = payload.sub;
    const acessToken = await this.jwtAuthService.createAcessToken({sub: matricula, role: payload.role});
    return {message: 'RefreshTOken valido',acessToken};
  }

}
