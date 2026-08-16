import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { AuthService } from '../auth/auth.service';
import { jwtAuthService } from '../auth/JwtAuth.service';
import type { Request } from 'express';
import { FavoritesRepository } from './favorites.repository';


@Injectable()
export class FavoritesService {
  constructor(private readonly jwtAuthService: jwtAuthService, private readonly favoritesRepository: FavoritesRepository){}

  async creatFavoriteMonitoring(request: Request, id: number) {
    //extrair refresh token
    const token = this.jwtAuthService.extractToken(request);
    //validar
    if (!token) {
      throw new UnauthorizedException('Token não enviado');
    }
    const payload = await this.jwtAuthService.verifyAccessToken(token);
    const matricula = payload.sub;

    const userExists = await this.favoritesRepository.findByRegistration( matricula);
    if(!userExists){
      throw new NotFoundException('Nao existe esse usuario')
    }  
    const monitoringExists = await this.favoritesRepository.findMonitoring(id);
    if(!monitoringExists){
      throw new NotFoundException('Monitoria nao existe')
    }

    const result = await this.favoritesRepository.createFavoriteMonitoring(matricula, id); 
    return {message: 'Monitoria favoritada com sucesso', result};
  }
  //GET
  async findFavoriteMonitoring(request: Request, name: string,page:number) {
    //extrair refresh token
    const token = this.jwtAuthService.extractToken(request);
    //validar
    if (!token) {
      throw new UnauthorizedException('Token não enviado');
    }
    const payload = await this.jwtAuthService.verifyAccessToken(token);
    const matricula = payload.sub;  
    const userExists = await this.favoritesRepository.findByRegistration( matricula);
    if(!userExists){
      throw new NotFoundException('Nao existe esse usuario')
    } 

    const result = await this.favoritesRepository.getFavoriteMonitoring(matricula, name,page)
    return {message: 'Monitoria favorita encontrada com sucesso', result};
  }
  async findAllFavoritesMonitorings(request: Request,page:number) {
    //extrair refresh token
    const token = this.jwtAuthService.extractToken(request);
    //validar
    if (!token) {
      throw new UnauthorizedException('Token não enviado');
    }
    const payload = await this.jwtAuthService.verifyAccessToken(token);
    const matricula = payload.sub;  
    const userExists = await this.favoritesRepository.findByRegistration( matricula);
    if(!userExists){
      throw new NotFoundException('Nao existe esse usuario')
    } 
  
    const result = await this.favoritesRepository.getAllFavoritesMonitorings(matricula,page)
    return {message: 'Monitorias favoritas encontradas com sucesso', result};
  }

  //DELETE
  async deleteFavoriteMonitoring(request: Request, id: number) {
    //extrair refresh token
    const token = this.jwtAuthService.extractToken(request);
    //validar
    if (!token) {
      throw new UnauthorizedException('Token não enviado');
    }
    const payload = await this.jwtAuthService.verifyAccessToken(token);
    const matricula = payload.sub;  
    const userExists = await this.favoritesRepository.findByRegistration( matricula);
    if(!userExists){
      throw new NotFoundException('Nao existe esse usuario')
    } 

    const monitoringExists = await this.favoritesRepository.findMonitoring(id);
    if(!monitoringExists){
      throw new NotFoundException('Nao existe essa monitoria')
    }

    const result = await this.favoritesRepository.deleteFavoriteMonitoring(id, matricula);
    return {message: 'Monitoria retirada de favorita com sucesso',result};
  }
}
