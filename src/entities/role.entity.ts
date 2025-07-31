import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'roles' })
export class RoleEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 500, nullable: true })
  description: string;

  @Column({ length: 50, unique: true })
  name: string;

  //? Relation avec la table users
  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];
}
