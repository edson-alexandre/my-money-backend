import { Repository } from 'typeorm';
import { dataSource } from '../../database/AppDatasource';
import AppError from '../../shared/errors/AppError';
import { Customer } from './../model/Customer';
import { CustomerDTO } from '../dto/CustomerDTO';
import { IPaginationReturn } from '../interfaces/IPaginationReturn';

export class CustomerService {
  repository: Repository<Customer>;
  constructor() {
    this.repository = dataSource.getRepository(Customer);
  }

  async create(resource: Customer): Promise<Customer> {
    return await this.repository.save(Customer.fromDTO(resource));
  }

  async list(page: number = 1, perPage: number = 5): Promise<IPaginationReturn<CustomerDTO[]>> {
    const [resources, total] = await this.repository.findAndCount({
      take: perPage,
      skip: (page - 1) * perPage,
    });
    return {
      page,
      perPage,
      total,
      data: resources.map(resource => Customer.toDTO(resource)),
    };
  }

  async findById(id: any): Promise<CustomerDTO> {
    const where = { id };
    const resource = await this.repository.findOneBy(where);
    return Customer.toDTO(resource);
  }

  async update(id: any, resource: Customer): Promise<Customer> {
    const where = { id };
    const resourceExists = await this.repository.findOneBy(where);
    if (!resourceExists) {
      throw new AppError('Recurso não localizado para atualização', 400);
    }
    return await this.repository.save(Customer.fromDTO(resource));
  }

  async delete(id: any): Promise<void> {
    const where = { id };
    const resourceExists = await this.repository.findOneBy(where);
    if (!resourceExists) {
      throw new AppError('Recurso não localizado para exclusão', 400);
    }
    await this.repository.delete(id);
  }

  async softDelete(id: any): Promise<void> {
    const where = { id };
    const resourceExists = await this.repository.findOneBy(where);
    if (!resourceExists) {
      throw new AppError('Recurso não localizado para exclusão', 400);
    }
    await this.repository.softDelete(id);
  }
}
