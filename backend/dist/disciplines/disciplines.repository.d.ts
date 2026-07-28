import { DatabaseService } from "../database/database.service";
import { UpdateDisciplineDto } from "./dto/update-discipline.dto";
export declare class DisciplinesRepository {
    private readonly db;
    constructor(db: DatabaseService);
    createDiscipline(matricula: string, curso: string, descricao: string): Promise<any>;
    findAllDisciplines(page: number): Promise<any>;
    findDiscipline(query: string, page: number): Promise<any>;
    updateDiscipline(discipline: UpdateDisciplineDto, id: number): Promise<any>;
    deleteDiscipline(id: number): Promise<any>;
}
