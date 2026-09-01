import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import * as argon2 from 'argon2';



import { UserResponseDto } from './dto/response-user.dto';
import { plainToInstance } from 'class-transformer';
import { jwtAuthService } from '../auth/JwtAuth.service';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesEnum } from '../auth/enums/Roles.enum';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository, private readonly jwtService: jwtAuthService){}

  //criar usuario
  async createUser(createUserDto: CreateUserDto) {
      //verificar se ja tem essa matricula cadastrada
      const userExists = await this.usersRepository.findByRegistration( createUserDto.matricula);
      if (userExists) {
        throw new ConflictException('usuario já cadastrado');
      }

      //senha hasheada
      const hashedPassword = await argon2.hash(createUserDto.senha);

      const payload = {sub: createUserDto.matricula};
      const acessToken =  await this.jwtService.createAcessToken(payload);
      const refreshToken = await this.jwtService.createRefreshToken(payload);

      const user = {
        matricula: createUserDto.matricula,
        nome: createUserDto.nome,
        email: createUserDto.email,
        senha: hashedPassword,
        sexo: createUserDto.sexo,
        role: 'aluno', //futuramente podera verificar pela matricula qual cargo o user tem
        refreshtoken: refreshToken
      };
      const result = await this.usersRepository.createUser(user); //vai mandar pro repository com os parametros sanitizados pelo DTO
      const nome = createUserDto.nome;

      return {message: 'usuario criado com sucesso',nome,acessToken, refreshToken,result: result};
  }


  //encontrar todos os usuarios
  async findAllUsers(page){
    const result = await this.usersRepository.findAllUsers(page);

    //excludeExtraneousValues: true faz com que somente os campos marcados com @Expose() sejam retornados.
    const sanatizedResult =  plainToInstance(UserResponseDto, result, {excludeExtraneousValues: true})
    return {message: 'usuarios encontrados com sucesso', result: sanatizedResult};
  }
  //buscar um usuario em especifico
  async findUser(name, page){
    const result = await this.usersRepository.findUser(name, page);

    const sanatizedResult =  plainToInstance(UserResponseDto, result, {excludeExtraneousValues: true})
    return {message: 'usuario encontrado com sucesso', result:sanatizedResult};
  }

  //atualizar usuario
  async updateUser(matricula: string, updateUserDto: UpdateUserDto) {
    const userExists = await this.usersRepository.findByRegistration( matricula);
    if(!userExists){
      throw new NotFoundException('Nao existe esse usuario')
    }

    //senha hasheada
    const hashedPassword = await argon2.hash(updateUserDto.senha!);
    const user = {
        nome: updateUserDto.nome,
        email: updateUserDto.email,
        senha: hashedPassword,
        sexo: updateUserDto.sexo,
    };
  
    const result = await this.usersRepository.updateUser(user, matricula);
    return {message: 'usuario atualizado com sucesso', result: result};
  }
  async updateRole(matricula: string, updateRoleDto: UpdateRoleDto, request: Request){
    const userExists = await this.usersRepository.findByRegistration(matricula);
    if(!userExists){
      throw new NotFoundException('Nao existe este usuario');
    }

    const currentUser = request['user'];
    const newRole = updateRoleDto.role;
    if(currentUser.role === RolesEnum.PROFESSOR && newRole === RolesEnum.PROFESSOR || currentUser.role === RolesEnum.PROFESSOR && newRole === RolesEnum.ADMINISTRADOR){
      throw new ForbiddenException('Um professor nao pode promover um usuario para este cargo')
    }
    if (currentUser.matricula === matricula) {
      throw new ForbiddenException('Você não pode alterar o próprio cargo');
    }

    const result = await this.usersRepository.updateRole(matricula,newRole)
    return {message: 'Cargo atualizdo com sucesso', result}
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

