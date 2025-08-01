import { RoleEntity } from 'src/entities/role.entity';
import { UserEntity } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

export async function seedAdmin(dataSource: DataSource) {
  const userRepo = dataSource.getRepository(UserEntity);
  const roleRepo = dataSource.getRepository(RoleEntity);

  const existingAdmin = await userRepo.findOne({
    where: { username: 'admin' },
  });

  if (existingAdmin) {
    console.log('Admin already exists');
    return;
  }

  const adminRole = await roleRepo.findOneBy({ id: 1 });

  const admin = new UserEntity();

  admin.username = 'admin';
  admin.email = 'admin@mail.com';
  admin.password = await bcrypt.hash('Admin1234=', 10);
  admin.role = adminRole!;

  await userRepo.save(admin);
  console.log('Admin user seeded successfully');
}
