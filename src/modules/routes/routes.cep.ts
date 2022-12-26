import { Router } from 'express';
import CepController from '../controllers/CepController';
import { requestValidation } from '../../shared/http/middlewares/requestValidation';
import { cepParamsSchema } from '../schemas/cepSchema';

const cepRouter = Router();
const controller = new CepController();

cepRouter.get('/:cep', requestValidation(cepParamsSchema), controller.getAddressByCep);

export { cepRouter };
