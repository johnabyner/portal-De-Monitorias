import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {} //esta chamando os services

  @HttpCode(201)
  @Post('signup') 
  createUser(@Body() createUserDto: CreateUserDto) { //vai passar por parametro o body da requisição no formato dto
    return this.usersService.createUser(createUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }
  // @Get(':id')
  // findUser(@Param('id') id: string) {
  //   return this.usersService.findUser(+id);
  // }

  // @Patch(':id')
  // updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.updateUser(+id, updateUserDto);
  // }

  // @Delete(':id')
  // deleteUser(@Param('id') id: string) {
  //   return this.usersService.deleteUser(+id);
  // }
}

