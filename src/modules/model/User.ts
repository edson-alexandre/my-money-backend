import { UserDTO } from './../dto/UserDTO';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export default class User {
  constructor(user: UserDTO) {
    Object.assign(this, User.fromDTO(user));
  }

  static fromDTO(user: UserDTO): User {
    return {
      ...(user?.id && { id: user.id }),
      name: user?.name || '',
      email: user?.email || '',
      ...(user?.password && { password: user?.password }),
      ...(user?.created_at && { created_at: user?.created_at }),
      ...(user?.updated_at && { updated_at: user?.updated_at }),
    };
  }

  static toDTO(user: User): UserDTO {
    return {
      ...(user?.id && { id: user.id }),
      name: user?.name || '',
      email: user?.email || '',
      ...(user?.password && { password: user?.password }),
      ...(user?.created_at && { created_at: user?.created_at }),
      ...(user?.updated_at && { updated_at: user?.updated_at }),
    };
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
