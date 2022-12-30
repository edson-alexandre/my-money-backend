import { SupplyerDTO } from './../dto/SupplyerDTO';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('Supplyer')
export class Supplyer {
  constructor(supplyer: SupplyerDTO) {
    Object.assign(this, Supplyer.fromDTO(supplyer));
  }

  static fromDTO(supplyer: SupplyerDTO): Supplyer {
    return {
      ...(supplyer?.id && { id: supplyer.id }),
      name: supplyer?.name || '',
      email: supplyer?.email || '',
      personType: supplyer?.personType || 'FISICA',
      cgcCpf: supplyer?.cgcCpf || '',
      contact: supplyer?.contact,
      city: supplyer?.city || '',
      state: supplyer?.state || '',
      street: supplyer?.street || '',
      number: supplyer?.number || '',
      details: supplyer?.details || '',
      district: supplyer?.district || '',
      zip: supplyer?.zip || '',
      country: supplyer?.country || '',
      ...(supplyer?.created_at && { created_at: supplyer.created_at }),
      ...(supplyer?.updated_at && { updated_at: supplyer.updated_at }),
    };
  }

  static toDTO(supplyer: Supplyer): SupplyerDTO {
    return {
      ...(supplyer?.id && { id: supplyer.id }),
      name: `${supplyer?.name}` || '',
      email: supplyer?.email || '',
      personType: supplyer?.personType || 'FISICA',
      cgcCpf: supplyer?.cgcCpf || '',
      contact: supplyer?.contact,
      city: supplyer?.city || '',
      state: supplyer?.state || '',
      street: supplyer?.street || '',
      number: supplyer?.number || '',
      details: supplyer?.details || '',
      district: supplyer?.district || '',
      zip: supplyer?.zip || '',
      country: supplyer?.country || '',
      ...(supplyer?.created_at && { created_at: supplyer.created_at }),
      ...(supplyer?.updated_at && { updated_at: supplyer.updated_at }),
    };
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: ['FISICA', 'JURIDICA'],
  })
  personType: string;

  @Column()
  cgcCpf: string;

  @Column()
  contact: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  details: string;

  @Column()
  district: string;

  @Column()
  zip: string;

  @Column()
  country: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
