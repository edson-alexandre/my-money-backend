import { dataSource } from '../../database/AppDatasource';
import { Supplyer } from '../model/Supplyer';
import { BaseResourceService } from './BaseResourceService';

export class SupplyerService extends BaseResourceService<Supplyer> {
  constructor() {
    super(dataSource.getRepository(Supplyer));
    this.repository = dataSource.getRepository(Supplyer);
  }
}
