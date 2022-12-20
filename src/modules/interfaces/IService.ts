import { DeepPartial } from 'typeorm';

export interface IService<T> {
  create(resource: DeepPartial<T>): Promise<DeepPartial<T>>;

  list(): Promise<T[]>;

  findById(id: number | string): Promise<T>;

  update(id: number | string, resource: DeepPartial<T>): Promise<DeepPartial<T>>;

  delete(id: number | string): Promise<void>;
}
