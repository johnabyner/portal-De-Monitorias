import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit {
    private pool: Pool;

    //vou colocar sem .env pq e so para testes
    async onModuleInit() { //quando o módulo termina de ser inicializado.
        try{
            this.pool = new Pool({
                host: 'localhost',
                port: 6666,
                user: 'monitoriaIFRJ',
                password: 'monitoria67',
                database: 'monitoriasDB',
            });

            await this.pool.query('SELECT 1'); //serve apenas para verificar se o banco realmente está acessível.
        }catch(err){
            console.error('Error ao conectar com o banco', err);
        }
    }

    //consulta
    async query(text: string, params?: any[]) {
        try{
            return await this.pool.query(text, params);
        }catch(err){
            console.error('Erro ao fazer a consulta ao BD', err)
        }
    }
}