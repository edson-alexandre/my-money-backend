import { DeepPartial } from 'typeorm';
import { IPaginationReturn } from './IPaginationReturn';

export interface IService<T, D> {
  create(resource: DeepPartial<T>): Promise<DeepPartial<T>>;

  list(page: number, perPage: number): Promise<IPaginationReturn<D[]>>;

  findById(id: number | string): Promise<D>;

  update(id: number | string, resource: DeepPartial<T>): Promise<DeepPartial<T>>;

  delete(id: number | string): Promise<void>;
}
