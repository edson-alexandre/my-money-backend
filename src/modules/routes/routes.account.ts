import { AccountController } from './../controllers/AccountController';
import { Router } from 'express';
import { supplyerPost, supplyerPut, idParamsSchema } from '../schemas/supplyerSchema';
import { requestValidation } from '../../shared/http/middlewares/requestValidation';

const accountRouter = Router();
const controller = new AccountController();

accountRouter.get('/', controller.list);
accountRouter.get('/:id', controller.getById);
accountRouter.post('/', controller.create);
accountRouter.put('/:id', controller.update);
accountRouter.delete('/:id', controller.delete);

export default accountRouter;
