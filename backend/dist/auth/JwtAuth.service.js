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
exports.jwtAuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let jwtAuthService = class jwtAuthService {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async createAcessToken(payload) {
        const acessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m', secret: process.env.JWT_ACCESS_SECRET });
        return acessToken;
    }
    async createRefreshToken(payload) {
        const refreshtoken = await this.jwtService.signAsync(payload, { expiresIn: '7d', secret: process.env.JWT_REFRESH_SECRET });
        return refreshtoken;
    }
    extractToken(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
    async verifyAccessToken(token) {
        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_ACCESS_SECRET });
            return payload;
        }
        catch {
            throw new common_1.UnauthorizedException('Token inválido');
        }
    }
    async verifyRefreshToken(token) {
        try {
            return this.jwtService.verifyAsync(token, { secret: process.env.JWT_REFRESH_SECRET, });
        }
        catch {
            throw new common_1.UnauthorizedException('Token invalido');
        }
    }
};
exports.jwtAuthService = jwtAuthService;
exports.jwtAuthService = jwtAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], jwtAuthService);
//# sourceMappingURL=JwtAuth.service.js.map