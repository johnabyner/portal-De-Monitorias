import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { createHash } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from './dto/response-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository, private jwtService: JwtService){}

  //criar usuario
  async createUser(createUserDto: CreateUserDto) {
      //verificar se ja tem essa matricula cadastrada
      const userExists = await this.usersRepository.findByRegistration( createUserDto.matricula);

      if (userExists) {
        throw new ConflictException('usuario já cadastrado');
      }

      //senha hasheada
      const hash = createHash('sha256'); //nosso hash no formato sha256
      hash.update(createUserDto.senha); //vai atualizar a variavel hash, hasheando a senha
      const hashedPassword = hash.digest('hex');

      //JWT
      const payload = {sub: createUserDto.matricula};
      const acessToken = await this.jwtService.signAsync(payload, {expiresIn: '15m',  secret: process.env.JWT_SECRET}); //tempo para ver os horarios
      const refreshtoken = await this.jwtService.signAsync(payload, {expiresIn: '7d', secret: process.env.JWT_SECRET}) //tempo para por exemplo em uma semana de provas nao ter q logar dnv

      const user = {
        matricula: createUserDto.matricula,
        nome: createUserDto.nome,
        email: createUserDto.email,
        senha: hashedPassword,
        sexo: createUserDto.sexo,
        role: 'aluno', //futuramente podera verificar pela matricula qual cargo o user tem
        refreshtoken: refreshtoken
      };
      const result = await this.usersRepository.create(user); //vai mandar pro repository com os parametros sanitizados pelo DTO

      return {message: 'usuario criado com sucesso',acessToken, refreshtoken,result: result};
  }


  //encontrar todos os usuarios
  async findAllUsers(page,limit){
    const result = await this.usersRepository.findAllUsers(page,limit);

    //excludeExtraneousValues: true faz com que somente os campos marcados com @Expose() sejam retornados.
    const sanatizedResult =  plainToInstance(UserResponseDto, result, {excludeExtraneousValues: true})
    return {message: 'usuarios encontrados com sucesso', result: sanatizedResult};
  }
  //buscar um usuario em especifico
  async findUser(name, page, limit){
    const result = await this.usersRepository.findUser(name, page, limit);

    const sanatizedResult =  plainToInstance(UserResponseDto, result, {excludeExtraneousValues: true})
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

