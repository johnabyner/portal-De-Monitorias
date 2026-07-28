import { CanActivate, ExecutionContext } from '@nestjs/common';
import { jwtAuthService } from '../JwtAuth.service';
export declare class JwtAuthGuard implements CanActivate {
    private readonly jwtService;
    constructor(jwtService: jwtAuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
