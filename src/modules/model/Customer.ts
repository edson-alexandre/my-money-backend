import { CustomerDTO } from './../dto/CustomerDTO';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('Customer')
export class Customer {
  constructor(customer: CustomerDTO) {
    Object.assign(this, Customer.fromDTO(customer));
  }

  static fromDTO(customer: CustomerDTO): Customer {
    return {
      ...(customer?.id && { id: customer.id }),
      name: customer?.name || '',
      email: customer?.email || '',
      personType: customer?.personType || 'FISICA',
      cgcCpf: customer?.cgcCpf || '',
      contact: customer?.contact,
      city: customer?.city || '',
      state: customer?.state || '',
      street: customer?.street || '',
      number: customer?.number || '',
      details: customer?.details || '',
      district: customer?.district || '',
      zip: customer?.zip || '',
      country: customer?.country || '',
      ...(customer?.created_at && { created_at: customer.created_at }),
      ...(customer?.updated_at && { updated_at: customer.updated_at }),
    };
  }

  static toDTO(customer: Customer): CustomerDTO {
    return {
      ...(customer?.id && { id: customer?.id }),
      name: customer?.name || '',
      email: customer?.email || '',
      personType: customer?.personType || 'FISICA',
      cgcCpf: customer?.cgcCpf || '',
      contact: customer?.contact,
      city: customer?.city || '',
      state: customer?.state || '',
      street: customer?.street || '',
      number: customer?.number || '',
      details: customer?.details || '',
      district: customer?.district || '',
      zip: customer?.zip || '',
      country: customer?.country || '',
      ...(customer?.created_at && { created_at: customer.created_at }),
      ...(customer?.updated_at && { updated_at: customer.updated_at }),
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
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
