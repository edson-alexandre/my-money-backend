import { IAddress } from './../interfaces/IAddress';
import axios from 'axios';
import AppError from '../../shared/errors/AppError';

export default class CepService {
  async getAddressByCep(cep: string): Promise<IAddress> {
    const result = await axios({
      method: 'get',
      url: `https://viacep.com.br/ws/${cep}/json`,
    })
      .then(res => res.data)
      .catch(() => {
        throw new AppError('Erro obtendo dados do CEP', 500);
      });
    return result;
  }
}
