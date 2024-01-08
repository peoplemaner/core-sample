import { CrudController } from '@nestjsx/crud';
import { Company } from './entities/company.entity';
import { CompaniesService } from './companies.service';
export declare class CompaniesController implements CrudController<Company> {
    service: CompaniesService;
    constructor(service: CompaniesService);
}
