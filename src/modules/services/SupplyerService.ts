import { SupplyerDTO } from './../dto/SupplyerDTO';
import { Repository } from 'typeorm';
import { IService } from './../interfaces/IService';
import { dataSource } from '../../database/AppDatasource';
import { Supplyer } from '../model/Supplyer';
import AppError from '../../shared/errors/AppError';
import { IPaginationReturn } from '../interfaces/IPaginationReturn';

export class SupplyerService implements IService<Supplyer, SupplyerDTO> {
  repository: Repository<Supplyer>;
  constructor() {
    this.repository = dataSource.getRepository(Supplyer);
  }
  async create(resource: Supplyer): Promise<Supplyer> {
    return await this.repository.save(Supplyer.fromDTO(resource));
  }

  async list(
    page: number = 1,
    perPage: number = 5,
    orderField?: string,
    orderDirection?: string,
  ): Promise<IPaginationReturn<SupplyerDTO[]>> {
    const obj = new Supplyer(null);

    if (orderField && obj[orderField] === undefined) {
      throw new AppError(`Campo ${orderField} não localizado para ordenação`);
    }
    if (orderDirection?.toUpperCase() !== 'DESC' && orderDirection?.toUpperCase() !== 'ASC') {
      orderDirection === 'ASC';
    }
    const [resources, total] = await this.repository.findAndCount({
      take: perPage,
      skip: (page - 1) * perPage,
      order: {
        ...(orderField && { [orderField]: orderDirection }),
      },
    });
    return {
      page,
      perPage,
      total,
      data: resources.map(resource => Supplyer.toDTO(resource)),
    };
  }

  async findById(id: any): Promise<SupplyerDTO> {
    const where = { id };
    const resource = await this.repository.findOneBy(where);
    return Supplyer.toDTO(resource);
  }

  async update(id: any, resource: Supplyer): Promise<Supplyer> {
    const where = { id };
    const resourceExists = await this.repository.findOneBy(where);
    if (!resourceExists) {
      throw new AppError('Recurso não localizado para atualização', 400);
    }
    return await this.repository.save(Supplyer.fromDTO(resource));
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
