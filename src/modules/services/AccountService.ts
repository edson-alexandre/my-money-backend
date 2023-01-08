import { AccountDTO } from './../dto/AccountDTO';
import Account from '../model/Account';
import { IService } from './../interfaces/IService';
import { DeepPartial, Not, Repository } from 'typeorm';
import { IPaginationReturn } from '../interfaces/IPaginationReturn';
import { dataSource } from '../../database/AppDatasource';
import AppError from '../../shared/errors/AppError';
export default class AccountService implements IService<Account, AccountDTO> {
  repository: Repository<Account>;

  constructor() {
    this.repository = dataSource.getRepository(Account);
  }

  async create(resource: Account): Promise<DeepPartial<Account>> {
    const thereIsShortCode = await this.repository.findOne({
      where: {
        shortCode: resource?.shortCode,
      },
    });

    if (thereIsShortCode) {
      throw new AppError('Já existe uma conta cadastradas com esse código reduzido');
    }
    let level = 1;
    if (resource?.superiorId) {
      const thereIsSuperiorAccount = await this.repository.findOne({
        where: {
          id: resource.superiorId,
        },
      });
      if (!thereIsSuperiorAccount) {
        throw new AppError('Conta superior não localizada');
      }
      level = thereIsSuperiorAccount?.level + 1;
      if (thereIsSuperiorAccount.isAnalytical) {
        throw new AppError('Apenas contas analíticas podem ser superior');
      }
    }
    const classification = await this.generateClassification(resource.superiorId);
    resource.classification = classification;
    resource.level = level;
    resource.isAnalytical = level === 3 ? true : false;

    return await this.repository.save(Account.fromDTO(resource));
  }

  async list(
    page: number,
    perPage: number,
    orderField?: string,
    orderDirection?: string,
  ): Promise<IPaginationReturn<AccountDTO[]>> {
    const obj = new Account(null);

    if (orderField && obj[orderField] === undefined) {
      throw new AppError(`Campo ${orderField} não localizado para ordenação`);
    }
    if (orderDirection?.toUpperCase() !== 'DESC' && orderDirection?.toUpperCase() !== 'ASC') {
      orderDirection === 'ASC';
    }

    const [resources, total] = await this.repository.findAndCount({
      take: perPage,
      skip: (page - 1) * perPage,
      order: {
        ...(orderField && { [orderField]: orderDirection }),
      },
    });
    return {
      page,
      perPage,
      total,
      data: resources.map(resource => Account.toDTO(resource)),
    };
  }

  async findById(id: any): Promise<AccountDTO> {
    const where = { id };
    const resource = await this.repository.findOneBy(where);
    return Account.toDTO(resource);
  }

  async update(id: any, resource: Account): Promise<DeepPartial<Account>> {
    let level = 1;
    if (resource?.superiorId) {
      const thereIsSuperiorAccount = await this.repository.findOne({
        where: {
          id: resource.superiorId,
        },
      });
      if (!thereIsSuperiorAccount) {
        throw new AppError('Conta superior não localizada');
      }
      level = thereIsSuperiorAccount?.level + 1;
      if (thereIsSuperiorAccount.isAnalytical) {
        throw new AppError('Apenas contas analíticas podem ser superior');
      }
    }
    const savedAccount = await this.repository.findOne({
      where: {
        id: resource.id,
      },
    });
    if (resource.superiorId !== savedAccount.superiorId) {
      const classification = await this.generateClassification(resource.superiorId);
      resource.classification = classification;
      resource.level = level;
      resource.isAnalytical = level === 3 ? true : false;
    }

    const where = { id };
    const resourceExists = await this.repository.findOneBy(where);
    if (!resourceExists) {
      throw new AppError('Recurso não localizado para atualização', 400);
    }
    const thereIsShortCode = await this.repository.findOne({
      where: {
        shortCode: resource?.shortCode,
        id: Not(id),
      },
    });
    if (thereIsShortCode) {
      throw new AppError('Já existe uma conta cadastradas com esse código reduzido');
    }
    return await this.repository.save(Account.fromDTO(resource));
  }
  async delete(id: any): Promise<void> {
    const where = { id };
    const resourceExists = await this.repository.findOneBy(where);
    if (!resourceExists) {
      throw new AppError('Recurso não localizado para exclusão', 400);
    }
    await this.repository.delete(id);
  }

  private async generateClassification(superiorId: string | null): Promise<string> {
    let classification = '';
    if (superiorId) {
      const superiorAccount = await this.repository.findOne({
        where: {
          id: superiorId,
        },
      });
      const lastAccount = await this.repository.findOne({
        where: {
          superiorId,
        },
        order: {
          classification: 'desc',
        },
      });
      if (!lastAccount) {
        classification = '01';
      } else {
        const classifications = lastAccount.classification.split('.');
        classification = `${parseInt(classifications[classifications.length - 1]) + 1}`;
      }
      if (classification.split('').length === 1) {
        classification = `0${classification}`;
      }
      return `${superiorAccount.classification}.${classification}`;
    } else {
      const superiorAccount = await this.repository.query(`SELECT MAX(classification) as classification
                                                             FROM "Account"
                                                            WHERE level=1`);
      classification = superiorAccount?.[0].classification
        ? `${parseInt(superiorAccount?.[0].classification) + 1}`
        : '1';
    }

    return classification;
  }
}
