import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.Dto';
import { UsersRepository } from '../users/users.repository';
import { jwtAuthService } from './JwtAuth.service';
import { Request } from 'express';


@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository, private readonly jwtAuthService: jwtAuthService){}

  async login(loginAuthDto: LoginAuthDto){
    //verificar se esta no bd
    const userExists = this.usersRepository.findByRegistration(loginAuthDto.matricula);

    if(!userExists){ 
      throw new NotFoundException('Nao existe esse usuario')
    }

    //criar acessToken e refreshToken
    const payload = {sub: loginAuthDto.matricula};
    const refreshToken = await this.jwtAuthService.createAcessToken(payload);
    const acessToken = await this.jwtAuthService.createRefreshToken(payload);

    //se estiver atualiza o refresh no bd
    const result = this.usersRepository.updateRefreshToken(loginAuthDto.matricula, refreshToken)

    return {message: 'usuario logado com sucesso', acessToken, refreshToken, result}
  }

  async refreshToken(request: Request){
    //extrair refresh token
    const token = this.jwtAuthService.extractToken(request);

    //validar
    if (!token) {
      throw new UnauthorizedException('Token não enviado');
    }

    const payload = await this.jwtAuthService.verifyRefreshToken(token);
    //retornar acessToken
    const matricula = payload.sub;
    const acessToken = await this.jwtAuthService.createAcessToken({sub: matricula});
    return {acessToken};
  }
  
  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
