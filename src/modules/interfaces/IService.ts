import { DeepPartial } from 'typeorm';
import { IPaginationReturn } from './IPaginationReturn';

export interface IService<T, D> {
  create(resource: T): Promise<DeepPartial<T>>;

  list(page: number, perPage: number, orderField?: string, orderDirection?: string): Promise<IPaginationReturn<D[]>>;

  findById(id: any): Promise<D>;

  update(id: any, resource: T): Promise<DeepPartial<T>>;

  delete(id: any): Promise<void>;
}
