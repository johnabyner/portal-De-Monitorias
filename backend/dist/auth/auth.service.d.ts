import { LoginAuthDto } from './dto/login-auth.Dto';
import { UsersRepository } from '../users/users.repository';
import { jwtAuthService } from './JwtAuth.service';
import { Request } from 'express';
export declare class AuthService {
    private readonly usersRepository;
    private readonly jwtAuthService;
    constructor(usersRepository: UsersRepository, jwtAuthService: jwtAuthService);
    login(loginAuthDto: LoginAuthDto): Promise<{
        message: string;
        acessToken: string;
        refreshToken: string;
        result: Promise<any>;
    }>;
    refreshToken(request: Request): Promise<{
        acessToken: string;
    }>;
}
