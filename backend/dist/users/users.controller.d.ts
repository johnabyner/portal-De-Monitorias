import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<{
        message: string;
        acessToken: string;
        refreshToken: string;
        result: any;
    }>;
    findAllUser(name?: string, page?: number): Promise<{
        message: string;
        result: import("./dto/response-user.dto").UserResponseDto;
    }>;
    updateUser(matricula: string, updateUserDto: UpdateUserDto): Promise<{
        message: string;
        result: any;
    }>;
    deleteUser(matricula: string): Promise<{
        message: string;
        result: any;
    }>;
}
