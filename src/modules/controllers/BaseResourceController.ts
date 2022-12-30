import { CustomerService } from './../services/CustomerService';
import { Request, Response } from 'express';
import { IController } from '../interfaces/IController';

export default abstract class BaseResourceController implements IController {
  service: CustomerService; // eslint-disable-line @typescript-eslint/no-explicit-any

  public abstract setService(): void;

  public create = async (req: Request, res: Response): Promise<Response> => {
    this.setService();
    const resource = await this.service.create({ ...req.body });
    return res.status(201).json(resource);
  };

  public list = async (req: Request, res: Response): Promise<Response> => {
    this.setService();
    const page = req.query.page as string;
    const perPage = req.query.perPage as string;
    const resource = await this.service.list(parseInt(page || `${0}`), parseInt(perPage || `${0}`));
    return res.json(resource);
  };

  public getById = async (req: Request, res: Response): Promise<Response> => {
    this.setService();
    const id = req.params.id;
    const resources = await this.service.findById(id);
    return res.json(resources);
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    this.setService();
    const id = req.params.id;
    const reousrce = await this.service.update(id, { id, ...req.body });
    return res.json(reousrce);
  };

  public delete = async (req: Request, res: Response): Promise<Response> => {
    this.setService();
    const id = req.params.id;
    await this.service.delete(id);
    return res.status(204).send();
  };

  public softDelete = async (req: Request, res: Response): Promise<Response> => {
    this.setService();
    const id = req.params.id;
    await this.service.softDelete(id);
    return res.status(204).send();
  };
}
