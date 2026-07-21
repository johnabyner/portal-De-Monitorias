import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { createHash } from "crypto";
import { Request } from 'express';


@Injectable()
export class jwtAuthService{
    constructor(private readonly jwtService: JwtService){}

    async createAcessToken(payload){
      const acessToken = await this.jwtService.signAsync(payload, {expiresIn: '15m',secret:process.env.JWT_ACCESS_SECRET}); //tempo para ver os horarios
      return acessToken;
    }
    async createRefreshToken(payload){
      const refreshtoken = await this.jwtService.signAsync(payload, {expiresIn: '7d', secret:process.env.JWT_REFRESH_SECRET}) //tempo para por exemplo em uma semana de provas nao ter q logar dnv
    
      return refreshtoken;
    }

    extractToken(request: Request) { //vai extrair o token
        const [type, token] = request.headers.authorization?.split(' ') ?? []; //vai dividir o tipo e o token

        return type === 'Bearer' ? token : undefined; //se o tipo for diferente de bearer vai retornar indefinido
    }

    async verifyAccessToken(token: string){

        try {
            const payload = await this.jwtService.verifyAsync(token,{secret: process.env.JWT_ACCESS_SECRET}); //vai verificar se e valido
            //se for valido vai descomprimir
            return payload;
        }catch {
            throw new UnauthorizedException('Token inválido');
        }
    }

    async verifyRefreshToken(token: string) {
        try{
            return this.jwtService.verifyAsync(token, {secret: process.env.JWT_REFRESH_SECRET,});
        }catch{
            throw new UnauthorizedException('Token invalido');
        }
    }

}