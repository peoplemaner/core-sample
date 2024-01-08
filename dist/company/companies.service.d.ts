import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Company } from './entities/company.entity';
export declare class CompaniesService extends TypeOrmCrudService<Company> {
    constructor(repo: any);
}
