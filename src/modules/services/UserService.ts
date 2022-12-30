import { IPayload } from './../interfaces/IPayload';
import AppError from '../../shared/errors/AppError';
import { dataSource } from '../../database/AppDatasource';
import User from '../model/User';
import CryptographyService from '../../shared/services/CryptographyService';
import jwt from 'jsonwebtoken';

export class UserService {
  protected repository;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  async list(): Promise<User[]> {
    const users = await this.repository.find();
    return users.map(user => {
      return User.toDTO(user);
    });
  }

  async create(user: User): Promise<User> {
    const cripto = new CryptographyService();
    try {
      user.password = cripto.encrypt(`${user.password}`);
    } catch (error) {
      throw new AppError('Ocorreu um erro ao tentar criptografar a senha. O usuário não foi salvo', 500);
    }
    return await this.repository.save(User.fromDTO(user));
  }

  async signin(email: string, password: string): Promise<IPayload> {
    const user = await this.repository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new AppError('Usuário ou senha inválidos');
    }
    const cripto = new CryptographyService();
    let savedPassword = '';
    try {
      savedPassword = cripto.decrypt(user.password);
    } catch (error) {
      console.log(error);
      throw new AppError('Ocorreu um erro ao comparar as senhas.', 500);
    }

    if (`${savedPassword}` !== `${password}`) {
      throw new AppError('Usuário ou senha inválidos');
    }
    let token = '';
    try {
      token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        process.env.TOKEN_KEY,
        {
          algorithm: 'HS256',
          expiresIn: '3d',
        },
      );
    } catch (error) {
      console.log(error);
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      iat: Math.floor(Date.now() / 1000),
      expiresIn: '3d',
      token,
    };
  }
}
