import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { Entity } from 'typeorm';

@Entity('Customer')
export class Customer {
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
