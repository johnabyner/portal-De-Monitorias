import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.Dto';
import type { Request } from 'express';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

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
  @ApiBearerAuth()
  //GET
  @Get('refreshToken') 
  refreshToken(@Req() request: Request) {
    return this.authService.refreshToken(request);
  }
}

// login
// validar senha

// refresh token