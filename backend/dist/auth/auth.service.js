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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("../users/users.repository");
const JwtAuth_service_1 = require("./JwtAuth.service");
let AuthService = class AuthService {
    usersRepository;
    jwtAuthService;
    constructor(usersRepository, jwtAuthService) {
        this.usersRepository = usersRepository;
        this.jwtAuthService = jwtAuthService;
    }
    async login(loginAuthDto) {
        const userExists = this.usersRepository.findByRegistration(loginAuthDto.matricula);
        if (!userExists) {
            throw new common_1.NotFoundException('Nao existe esse usuario');
        }
        const payload = { sub: loginAuthDto.matricula };
        const refreshToken = await this.jwtAuthService.createAcessToken(payload);
        const acessToken = await this.jwtAuthService.createRefreshToken(payload);
        const result = this.usersRepository.updateRefreshToken(loginAuthDto.matricula, refreshToken);
        return { message: 'usuario logado com sucesso', acessToken, refreshToken, result };
    }
    async refreshToken(request) {
        const token = this.jwtAuthService.extractToken(request);
        if (!token) {
            throw new common_1.UnauthorizedException('Token não enviado');
        }
        const payload = await this.jwtAuthService.verifyRefreshToken(token);
        const matricula = payload.sub;
        const acessToken = await this.jwtAuthService.createAcessToken({ sub: matricula });
        return { acessToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository, JwtAuth_service_1.jwtAuthService])
], AuthService);
//# sourceMappingURL=auth.service.js.map