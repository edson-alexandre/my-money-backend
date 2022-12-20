import { IService } from '../interfaces/IService';
import { DeepPartial, Repository } from 'typeorm';
import AppError from '../../shared/errors/AppError';

export abstract class BaseResourceService<T> implements IService<T> {
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async create(resource: DeepPartial<T>): Promise<DeepPartial<T>> {
    return await this.repository.save(resource);
  }

  async list(): Promise<T[]> {
    const resources = await this.repository.find();
    return resources;
  }

  async findById(id: any): Promise<T> {
    const where = { id };
    const resource = await this.repository.findOneBy(where);
    return resource;
  }

  async update(id: any, resource: DeepPartial<T>): Promise<T> {
    const where = { id };
    const resourceExists = await this.repository.findOneBy(where);
    if (!resourceExists) {
      throw new AppError('Recurso não localizado para atualização', 400);
    }
    return await this.repository.save(resource);
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
