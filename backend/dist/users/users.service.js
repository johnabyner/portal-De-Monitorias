"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./users.repository");
const crypto_1 = require("crypto");
const response_user_dto_1 = require("./dto/response-user.dto");
const class_transformer_1 = require("class-transformer");
const JwtAuth_service_1 = require("../auth/JwtAuth.service");
let UsersService = class UsersService {
    usersRepository;
    jwtService;
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async createUser(createUserDto) {
        const userExists = await this.usersRepository.findByRegistration(createUserDto.matricula);
        if (userExists) {
            throw new common_1.ConflictException('usuario já cadastrado');
        }
        const hash = (0, crypto_1.createHash)('sha256');
        hash.update(createUserDto.senha);
        const hashedPassword = hash.digest('hex');
        const payload = { sub: createUserDto.matricula };
        const acessToken = await this.jwtService.createAcessToken(payload);
        const refreshToken = await this.jwtService.createRefreshToken(payload);
        const user = {
            matricula: createUserDto.matricula,
            nome: createUserDto.nome,
            email: createUserDto.email,
            senha: hashedPassword,
            sexo: createUserDto.sexo,
            role: 'aluno',
            refreshtoken: refreshToken
        };
        const result = await this.usersRepository.createUser(user);
        return { message: 'usuario criado com sucesso', acessToken, refreshToken, result: result };
    }
    async findAllUsers(page) {
        const result = await this.usersRepository.findAllUsers(page);
        const sanatizedResult = (0, class_transformer_1.plainToInstance)(response_user_dto_1.UserResponseDto, result, { excludeExtraneousValues: true });
        return { message: 'usuarios encontrados com sucesso', result: sanatizedResult };
    }
    async findUser(name, page) {
        const result = await this.usersRepository.findUser(name, page);
        const sanatizedResult = (0, class_transformer_1.plainToInstance)(response_user_dto_1.UserResponseDto, result, { excludeExtraneousValues: true });
        return { message: 'usuario encontrado com sucesso', result: sanatizedResult };
    }
    async updateUser(matricula, updateUserDto) {
        const userExists = await this.usersRepository.findByRegistration(matricula);
        if (!userExists) {
            throw new common_1.NotFoundException('Nao existe esse usuario');
        }
        const result = await this.usersRepository.updateUser(updateUserDto, matricula);
        return { message: 'usuario atualizado com sucesso', result: result };
    }
    async deleteUser(matricula) {
        const userExists = await this.usersRepository.findByRegistration(matricula);
        if (!userExists) {
            throw new common_1.NotFoundException('Nao existe esse usuario');
        }
        const result = await this.usersRepository.deleteUser(matricula);
        return { message: 'usuario deletedo com sucesso', result: result };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository, JwtAuth_service_1.jwtAuthService])
], UsersService);
//# sourceMappingURL=users.service.js.map