import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {} //esta chamando os services

  @Post('signup') 
  createUser(@Body() createUserDto: CreateUserDto) { //vai passar por parametro o body da requisição no formato dto
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findAllUser(@Query('name') name: string, @Query('page') page = 0, @Query('limit') limit = 20){
    //se tiver na query um nome, vai proucurar por esse usuario em especifico
    if(name){
      return this.usersService.findUser(name, Number(page), Number(limit));
    }
    return this.usersService.findAllUsers(Number(page), Number(limit));
  } 

  @Patch(':matricula')
  updateUser(@Param('matricula') matricula: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(matricula,updateUserDto);
  }

  @HttpCode(204)
  @Delete(':matricula')
  deleteUser(@Param('matricula') matricula: string) {
    return this.usersService.deleteUser(matricula);
  }
}

