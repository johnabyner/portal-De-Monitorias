import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.Dto';
import type { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
