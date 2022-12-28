import { SupplyerController } from '../controllers/SupplyerController';
import { Router } from 'express';
import { supplyerPost, supplyerPut, idParamsSchema } from '../schemas/supplyerSchema';
import { requestValidation } from '../../shared/http/middlewares/requestValidation';

const supplyerRouter = Router();
const controller = new SupplyerController();

supplyerRouter.get('/', controller.list);
supplyerRouter.get('/:id', requestValidation(idParamsSchema), controller.getById);
supplyerRouter.post('/', requestValidation(supplyerPost), controller.create);
supplyerRouter.put('/:id', requestValidation(idParamsSchema), requestValidation(supplyerPut), controller.update);
supplyerRouter.delete('/:id', requestValidation(idParamsSchema), controller.delete);

export default supplyerRouter;
