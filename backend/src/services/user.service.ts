import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleEntity } from 'src/entities/role.entity';
import {
  EmailAlreadyExistsException,
  InvalidLoginException,
  UsernameAlreadyExistsException,
} from 'src/models/errors.model';

export type SafeUser = Omit<UserEntity, 'password'>;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async create(newUser: UserEntity) {
    newUser.username = newUser.username.toLowerCase();
    newUser.email = newUser.email.toLowerCase();

    //* Vérification du username
    const existingUsername = await this.userRepository.findOne({
      where: { username: newUser.username },
    });

    if (existingUsername) {
      throw new UsernameAlreadyExistsException(newUser.username);
    }

    //* Vérification de l'email

    const existingEmail = await this.userRepository.findOne({
      where: { email: newUser.email },
    });

    if (existingEmail) {
      throw new EmailAlreadyExistsException(newUser.email);
    }

    //* Hash du password
    newUser.password = await bcrypt.hash(newUser.password, 10);

    //* Rôle de par défaut = user
    const defaultRole = await this.roleRepository.findOneBy({ id: 2 });
    newUser.role = defaultRole!;

    return this.userRepository.save(newUser);
  }

  async login(credentials: string, password: string) {
    const cred = credentials.toLowerCase();

    const existingUser = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'r')
      .where('LOWER(user.username) = :cred OR LOWER(user.email) = :cred', { cred })
      .addSelect('user.password')
      .getOne();

    //? L'utilisateur peut se connecter via username OU email
    if (!existingUser) {
      throw new InvalidLoginException();
    }

    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) {
      throw new InvalidLoginException();
    }
    return existingUser;
  }

  async findByIdWithRole(id: string): Promise<{ user: Omit<UserEntity, 'password'> } | null> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
      select: {
        id: true,
        username: true,
        email: true,
        created_at: true,
        updated_at: true,
        role: { id: true, name: true }, // limite ce que tu exposes sur le rôle
      },
    });

    return user ? { user } : null;
  }
}
