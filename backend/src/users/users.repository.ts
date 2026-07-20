import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersRepository {
    constructor(private readonly db: DatabaseService) {}
    //criar um usuario
    async create(user) {
        const result = await this.db.query(
            `
            INSERT INTO users
            (matricula, nome, email, senha, sexo, role, refreshtoken)
            VALUES ($1,$2,$3,$4,$5,$6, $7);
            `,
            [
                user.matricula,
                user.nome,
                user.email,
                user.senha,
                user.sexo,
                user.role,
                user.refreshtoken
            ],
        );
        return result.rows[0];
    }
    //achar a martricula
    async findByRegistration(matricula: string) {
        const result = await this.db.query(
            `SELECT * FROM users WHERE matricula = $1;`,
            [matricula],
        );

        return result.rows[0];
    }
    //achar todos
    async findAllUsers(page: number,limit: number){
        const result = await this.db.query(
            `SELECT * FROM users OFFSET $1 LIMIT $2 ;`,
            [
                page,limit
            ]
        );

        return result.rows;
    }
    //achar um usuario em especifico
    async findUser(name: string,page: number,limit: number){
        const result = await this.db.query(
            `SELECT * FROM users WHERE nome LIKE $1  OFFSET $2 LIMIT $3;`,
            [
                `%${name}%`,page,limit
            ]
        )
        
        return result.rows;
    }

    async updateUser(user: UpdateUserDto, matricula: string){
        //com coaslescense, se for null ele nao vai atualizar
        const result = await this.db.query(
            `
            UPDATE users
            SET
                nome = COALESCE($1, nome),
                email = COALESCE($2, email),
                senha = COALESCE($3, senha),
                sexo = COALESCE($4, sexo)
            WHERE matricula = $5;
            `,
            [
                user.nome ?? null,
                user.email ?? null,
                user.senha ?? null,
                user.sexo ?? null,
                matricula
            ]
        )
        return result.rows[0];
    }

    async deleteUser(matricula: string){
        const result = await this.db.query(
            `
                DELETE FROM users
                WHERE matricula = $1;
            `,
            [
                matricula
            ]
        )
        return result.rows[0];
    }
}