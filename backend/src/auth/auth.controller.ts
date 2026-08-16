import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.Dto';
import type { Request } from 'express';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('auth') //swagger
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //SWAGGER
  @ApiOperation({summary:'logar o usuario'})
  @ApiBody({
    type: LoginAuthDto,
    description: 'Detalhes do usuario para login',
    examples: {
      usuario: {
        summary: 'Exemplo de login',
        value: {
          matricula: '20230001',
          senha: 'euamolinux'
        }
      }
    }
  })
  //POST
  @Post()
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  //SWAGGER
  @ApiOperation({
    summary: 'Gera um novo access token',
    description: 'Utiliza um refresh token válido para gerar um novo access token.',
  })
  @ApiBody({
    type: RefreshTokenDto,
    description: 'Detalhes do refreshToken para retornar um acessToken',
    examples: {
      refreshToken:{
        summary: 'Exemplo de refrehsToken',
        value: {
          refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....'
        }
      }
    }
  })
  //POST
  @Post('refresh')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }
}