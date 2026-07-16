import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class UsersRepository {
    constructor(private readonly db: DatabaseService) {}

    async create(user) {
        await this.db.query(
            `
            INSERT INTO users
            (matricula, nome, email, senha, sexo, role)
            VALUES ($1,$2,$3,$4,$5,$6)
            `,
            [
                user.matricula,
                user.nome,
                user.email,
                user.senha,
                user.sexo,
                user.role,
            ],
        );
    }

    async findByRegistration(matricula: string) {
        const result = await this.db.query(
            `SELECT * FROM users WHERE matricula = $1`,
            [matricula],
        );

        return result.rows[0];
    }
}