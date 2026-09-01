import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from '../auth/enums/Roles.enum';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags('users') //swagger
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {} //esta chamando os services

  //SWAGGER
  @ApiOperation({summary: 'Cadastrar usuario'})
  @ApiBody({
    type: CreateUserDto,
    description: 'Detalhes do usuário para cadastro',
    examples: {
      usuario: {
        summary: 'Exemplo de cadastro',
        value: {
          matricula: '20230001',
          nome: 'Davi',
          sexo: 'masculino',
          email: 'davi@gmail.com',
          senha: 'euamolinux',
        },
      },
    },
  })
  //POST
  @Post('signup') 
  createUser(@Body() createUserDto: CreateUserDto) { //vai passar por parametro o body da requisição no formato dto
    return this.usersService.createUser(createUserDto);
  }

  //SWAGGER
  @ApiBearerAuth()
  @ApiOperation({summary: 'Lista usuarios'})
  @ApiQuery({name: 'name', example: 'carlos' ,required: false})
  @ApiQuery({name:'page', required: false, example: 0})
  //GET
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.PROFESSOR, RolesEnum.ADMINISTRADOR)  
  @Get()
  findAllUser(@Query('name') name?: string, @Query('page') page = 0){
    //se tiver na query um nome, vai proucurar por esse usuario em especifico
    if(name){
      return this.usersService.findUser(name, Number(page));
    }
    return this.usersService.findAllUsers(Number(page));
  } 
  
  //SWAGGER
  @ApiBearerAuth()
  @ApiOperation({summary: 'Atualizar usuario'})
  @ApiParam({name: 'matricula', example: '20230001'})
  @ApiBody({
    type: UpdateUserDto,
    description: 'Detalhes do usuario para atualizar',
    examples:{
      usuario:{
        summary:'Exemplo de edicao',
        value:{
         nome: 'hatsune',
         email: 'hatsuneMiku@gmail.com',
         sexo: 'feminino',
         senha: 'euamolinux' 
        }
      }
    }
  })
  @UseGuards(JwtAuthGuard)
  //PATCH
  @Patch(':matricula')
  updateUser(@Param('matricula') matricula: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(matricula,updateUserDto);
  }

  //SWAGGER
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.PROFESSOR, RolesEnum.ADMINISTRADOR)
  //PATCH /users/{matricula}/role
  @Patch(':matricula/role')
  updateRole(@Param('matricula') matricula: string, @Body() updateRoleDto: UpdateRoleDto, @Request() request: Request){
    return this.usersService.updateRole(matricula,updateRoleDto,request);
  }

  //SWAGGER
  @ApiBearerAuth()
  @ApiOperation({summary: 'Deletar usuario'})
  @ApiParam({name: 'matricula', example: '20230001'})
  //DELETE
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Delete(':matricula')
  deleteUser(@Param('matricula') matricula: string) {
    return this.usersService.deleteUser(matricula);
  }
}
