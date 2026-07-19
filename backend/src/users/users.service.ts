import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository){}

  //criar usuario
  async createUser(createUserDto: CreateUserDto) {
      //verificar se ja tem essa matricula cadastrada
      const userExists = await this.usersRepository.findByRegistration( createUserDto.matricula);

      if (userExists) {
        throw new ConflictException('usuario já cadastrado');
      }

      // hash da senha aqui (futuramente)
      //createUserDto.senha

      const user = {
        matricula: createUserDto.matricula,
        nome: createUserDto.nome,
        email: createUserDto.email,
        senha: createUserDto.senha,
        sexo: createUserDto.sexo,
        role: 'aluno',
      };

      const result = await this.usersRepository.create(user); //vai mandar pro repository com os parametros sanitizados pelo DTO
      return {message: 'usuario criado com sucesso', result: result};
  }
  //encontrar todos os usuarios
  async findAllUsers(page,limit){
    const result = await this.usersRepository.findAllUsers(page,limit);

    return {message: 'usuarios encontrados com sucesso', result: result};
  }
  //buscar um usuario em especifico
  async findUser(name, page, limit){
    const result = await this.usersRepository.findUser(name, page, limit);

    return {message: 'usuario encontrado com sucesso', result: result};
  }
  //atualizar usuario
  async updateUser(matricula: string, updateUserDto: UpdateUserDto) {
    const userExists = await this.usersRepository.findByRegistration( matricula);
    if(!userExists){
      throw new NotFoundException('Nao existe esse usuario')
    }

    const result = await this.usersRepository.updateUser(updateUserDto, matricula);
    return {message: 'usuario atualizado com sucesso', result: result};
  }
  //deletar usuario
  async deleteUser(matricula: string) {
    const userExists = await this.usersRepository.findByRegistration( matricula);
    if(!userExists){
      throw new NotFoundException('Nao existe esse usuario')
    }  

    const result = await this.usersRepository.deleteUser(matricula)
    return {message: 'usuario deletedo com sucesso', result: result}
  }
}

