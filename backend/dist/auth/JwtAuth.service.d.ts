import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';
export declare class jwtAuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    createAcessToken(payload: any): Promise<string>;
    createRefreshToken(payload: any): Promise<string>;
    extractToken(request: Request): string | undefined;
    verifyAccessToken(token: string): Promise<any>;
    verifyRefreshToken(token: string): Promise<any>;
}
