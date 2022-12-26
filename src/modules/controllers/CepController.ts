import { Request, Response } from 'express';
import CepService from '../services/CepServices';

export default class CepController {
  async getAddressByCep(req: Request, res: Response): Promise<Response> {
    const cep = req.params.cep;
    const service = new CepService();
    const result = await service.getAddressByCep(cep);
    return res.json(result);
  }
}
