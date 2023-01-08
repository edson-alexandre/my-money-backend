import { AccountDTO } from './../dto/AccountDTO';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { EAccountNature } from '../enums/EAccountNature';

@Entity('Account')
export default class Account {
  constructor(account: AccountDTO) {
    Object.assign(this, Account.fromDTO(account));
  }

  static fromDTO(account: AccountDTO): Account {
    return {
      ...(account?.id && { id: account.id }),
      shortCode: account?.shortCode || 0,
      classification: account?.classification || ' ',
      isAnalytical: account?.isAnalytical || false,
      nature: account?.nature || EAccountNature['D'],
      level: account?.level || 0,
      description: account?.description || '',
      superiorId: account?.superiorId || null,
      ...(account?.created_at && { created_at: account.created_at }),
      ...(account?.updated_at && { updated_at: account.created_at }),
    };
  }

  static toDTO(account: Account): AccountDTO {
    return {
      ...(account?.id && { id: account.id }),
      shortCode: account?.shortCode || 0,
      classification: account?.classification || ' ',
      isAnalytical: account?.isAnalytical || false,
      nature: account?.nature || EAccountNature['D'],
      level: account?.level || 0,
      description: account?.description || '',
      superiorId: account?.superiorId || null,
      ...(account?.created_at && { created_at: account.created_at }),
      ...(account?.updated_at && { updated_at: account.created_at }),
    };
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  shortCode: number;

  @Column()
  classification: string;

  @Column() isAnalytical: boolean;

  @Column({
    type: 'enum',
    enum: EAccountNature,
    default: EAccountNature.D,
  })
  nature: EAccountNature;

  @Column()
  level: number;

  @Column()
  description: string;

  @Column()
  superiorId: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
