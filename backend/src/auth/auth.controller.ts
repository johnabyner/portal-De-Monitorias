import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginAuthDto } from './dto/loginAuthDto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

//   @Post()
//   login(@Body() loginAuthDto: loginAuthDto) {
//     //return this.authService.login(loginAuthDto);
//   }


//   @Get() 
//   refresh() {
//     //return this.authService.findAll();
//   }
}

// login
// gerar JWT
// validar senha

// refresh token