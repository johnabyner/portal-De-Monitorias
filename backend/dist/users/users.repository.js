"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let UsersRepository = class UsersRepository {
    db;
    constructor(db) {
        this.db = db;
    }
    async createUser(user) {
        const result = await this.db.query(`
            INSERT INTO users
            (matricula, nome, email, senha, sexo, role, refreshtoken)
            VALUES ($1,$2,$3,$4,$5,$6, $7);
            `, [
            user.matricula,
            user.nome,
            user.email,
            user.senha,
            user.sexo,
            user.role,
            user.refreshtoken
        ]);
        return result.rows[0];
    }
    async findByRegistration(matricula) {
        const result = await this.db.query(`SELECT * FROM users WHERE matricula = $1;`, [matricula]);
        return result.rows[0];
    }
    async findAllUsers(page) {
        const result = await this.db.query(`SELECT * FROM users OFFSET $1 LIMIT 20 ;`, [
            page
        ]);
        return result.rows;
    }
    async findUser(name, page) {
        const result = await this.db.query(`SELECT * FROM users WHERE nome ILIKE $1  OFFSET $2 LIMIT 20;`, [
            `%${name}%`, page
        ]);
        return result.rows;
    }
    async updateUser(user, matricula) {
        const result = await this.db.query(`
            UPDATE users
            SET
                nome = COALESCE($1, nome),
                email = COALESCE($2, email),
                senha = COALESCE($3, senha),
                sexo = COALESCE($4, sexo)
            WHERE matricula = $5;
            `, [
            user.nome ?? null,
            user.email ?? null,
            user.senha ?? null,
            user.sexo ?? null,
            matricula
        ]);
        return result.rows[0];
    }
    async deleteUser(matricula) {
        const result = await this.db.query(`
                DELETE FROM users
                WHERE matricula = $1;
            `, [
            matricula
        ]);
        return result.rows[0];
    }
    async updateRefreshToken(matricula, refreshToken) {
        const result = await this.db.query(`
                UPDATE users
                SET
                    refreshtoken = $1
                WHERE matricula = $2;
            `, [
            refreshToken,
            matricula
        ]);
        return result.rows[0];
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map