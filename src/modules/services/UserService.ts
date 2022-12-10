import AppError from '../../config/errors/AppError';
import { dataSource } from '../../database/AppDatasource';
import User from '../model/User';

export class UserService {
  protected repository;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  async list(): Promise<User[]> {
    const users = await this.repository.find();
    return users.map(user => {
      delete user.password;
      return user;
    });
  }

  async create(user: User): Promise<User> {
    return await this.repository.save(user);
  }
}
