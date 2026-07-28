import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { UserResponseDto } from './dto/response-user.dto';
import { jwtAuthService } from '../auth/JwtAuth.service';
export declare class UsersService {
    private readonly usersRepository;
    private readonly jwtService;
    constructor(usersRepository: UsersRepository, jwtService: jwtAuthService);
    createUser(createUserDto: CreateUserDto): Promise<{
        message: string;
        acessToken: string;
        refreshToken: string;
        result: any;
    }>;
    findAllUsers(page: any): Promise<{
        message: string;
        result: UserResponseDto;
    }>;
    findUser(name: any, page: any): Promise<{
        message: string;
        result: UserResponseDto;
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
