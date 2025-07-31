import { DataSource } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';

export async function seedRoles(dataSource: DataSource) {
  const roleRepo = dataSource.getRepository(RoleEntity);

  // Vérifie si les rôles existent déjà
  const existing = await roleRepo.find();
  if (existing.length > 0) {
    console.log('✅ Roles already seeded');
    return;
  }

  console.log('🌱 Seeding roles...');

  // Forcer l'insertion avec des IDs fixes
  await dataSource.query('SET IDENTITY_INSERT roles ON;');

  await roleRepo
    .createQueryBuilder()
    .insert()
    .into(RoleEntity)
    .values([
      { id: 1, name: 'admin', description: 'Administrateur' },
      { id: 2, name: 'user', description: 'Utilisateur standard' },
    ])
    .execute();

  await dataSource.query('SET IDENTITY_INSERT roles OFF;');

  console.log('🌱 Roles seeded successfully');
}
