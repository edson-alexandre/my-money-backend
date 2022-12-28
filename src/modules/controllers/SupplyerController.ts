import { SupplyerService } from '../services/SupplyerService';
import BaseResourceController from './BaseResourceController';

export class SupplyerController extends BaseResourceController {
  service: SupplyerService;
  public setService(): void {
    this.service = new SupplyerService();
  }
}
