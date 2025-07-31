import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleEntity } from 'src/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async create(newUser: UserEntity) {
    const existingUsername = await this.userRepository.findOne({
      where: {
        username: newUser.username.toLowerCase(),
      },
    });

    if (existingUsername) {
      throw new Error('Username already exists');
    }

    //* Hash du password
    newUser.password = await bcrypt.hash(newUser.password, 10);

    //* Rôle de par défaut = user
    const defaultRole = await this.roleRepository.findOneBy({ id: 2 });
    newUser.role = defaultRole!;

    return this.userRepository.save(newUser);
  }

  async login(credentials: string, password: string) {
    const existingUser = await this.userRepository.findOne({
      where: [{ username: credentials.toLowerCase() }, { email: credentials.toLowerCase() }],
      //? Inclure le rôle dans le token
      relations: ['role'],
    });

    //? L'utilisateur peut se connecter via username OU email
    if (!existingUser) {
      throw new Error('Invalid email or username');
    }

    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) {
      throw new Error('Invalid login ');
    }
    return existingUser;
  }
}
