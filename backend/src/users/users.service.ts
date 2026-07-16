import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository){}

  async createUser(createUserDto: CreateUserDto) {
      const userExists = await this.usersRepository.findByRegistration( //verificar se ja tem essa matricula cadastrada
        createUserDto.matricula,
      );
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

      await this.usersRepository.create(user); //vai mandar pro repository com os parametros sanitizados pelo DTO
      return {message: 'usuario criado com sucesso'};
  }

  findAll(){
    return 'users';
  }
  findUser(id: number) {
    return `This action returns a #${id} user`;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  deleteUser(id: number) {
    return `This action removes a #${id} user`;
  }
}
