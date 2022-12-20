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
    const resource = await this.repository.findOne(id);
    return resource;
  }

  async update(id: any, resource: DeepPartial<T>): Promise<DeepPartial<T>> {
    const resourceExists = await this.repository.findOne(id);
    if (!resourceExists) {
      throw new AppError('Recurso não localizado para atualização', 400);
    }
    return await this.repository.save(resource);
  }

  async delete(id: any): Promise<void> {
    const resourceExists = await this.repository.findOne(id);
    if (!resourceExists) {
      throw new AppError('Recurso não localizado para exclusão', 400);
    }
    await this.repository.delete(id);
  }

  async softDelete(id: any): Promise<void> {
    const resourceExists = await this.repository.findOne(id);
    if (!resourceExists) {
      throw new AppError('Recurso não localizado para exclusão', 400);
    }
    await this.repository.softDelete(id);
  }
}
