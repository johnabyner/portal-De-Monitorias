import { DatabaseService } from "../database/database.service";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UsersRepository {
    private readonly db;
    constructor(db: DatabaseService);
    createUser(user: any): Promise<any>;
    findByRegistration(matricula: string): Promise<any>;
    findAllUsers(page: number): Promise<any>;
    findUser(name: string, page: number): Promise<any>;
    updateUser(user: UpdateUserDto, matricula: string): Promise<any>;
    deleteUser(matricula: string): Promise<any>;
    updateRefreshToken(matricula: string, refreshToken: string): Promise<any>;
}
