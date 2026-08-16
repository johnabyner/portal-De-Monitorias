import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import type { Request } from 'express';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesEnum } from '../auth/enums/Roles.enum';

@ApiTags('Favorites')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  //correção do authModule e criação do modulo de favoritos
  //adicionado nome as monitorias

  //SWAGGER
  @ApiOperation({summary: 'Cadastrar monitoria favorita'})
  @ApiBearerAuth()
  @ApiParam({name: 'id', example: 0})
  //POST
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  createFavoriteMonitoring(@Req() request: Request, @Param('id', ParseIntPipe) id: number) {
    return this.favoritesService.creatFavoriteMonitoring(request, id);
  }

  // //SWAGGER
  // @ApiOperation({summary: 'Buscar monitorias favoritas'})
  // @ApiBearerAuth()
  // @ApiQuery({name: 'name',required: false, example: 'sociologia'})

  // //GET
  // @UseGuards(JwtAuthGuard)
  // @Get()
  // findFavoritesMonitorings(@Req() request: Request,@Query('name') name? : string) {
  //   if(name){
  //     return this.favoritesService.findFavoriteMonitoring(request, name);
  //   }else{
  //     return this.favoritesService.findAllFavoritesMonitorings(request);
  //   }
  // }

  //SWAGGER
  @ApiOperation({summary: 'Deletar monitoria favorita'})
  @ApiBearerAuth()
  @ApiParam({name: 'id', example: 0})

  //DELETE
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.PROFESSOR, RolesEnum.ADMINISTRADOR)  
  @Delete(':id')
  removeFavoriteMonitoring(@Req() request: Request, @Param('id', ParseIntPipe) id: number) {
    return this.favoritesService.deleteFavoriteMonitoring(request,id);
  }
}
