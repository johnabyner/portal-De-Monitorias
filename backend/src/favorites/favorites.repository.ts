import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class FavoritesRepository{
    constructor(private readonly db: DatabaseService){}
    //CREATE
    async createFavoriteMonitoring(matricula: string, id: number){
        const result = await this.db.query(
            `
                INSERT INTO favoritos (user_matricula,monitoria_id) VALUES ($1,$2);
            `,[matricula,id]
        );
        return result.rows[0];
    }
    //GET
    async findMonitoring(id: number){
        const result = await this.db.query(
            `
                SELECT * FROM monitorias WHERE id = $1;
            `,[id]
        );
        return result.rows[0];
    }
    async findByRegistration(matricula: string) {
        const result = await this.db.query(
            `SELECT * FROM users WHERE matricula = $1;`,
            [matricula],
        );

        return result.rows[0];
    }

    //GET
    async getAllFavoritesMonitorings(){

    }
    async getFavoriteMonitoring(){

    }
    //DELETE
    async deleteFavoriteMonitoring(id: number, matricula: string){
        const result = await this.db.query(
            `
                DELETE FROM favoritos WHERE id = $1 AND user_matricula = $2;
            `,[id, matricula]
        )
        return result.rows[0];
    }
}