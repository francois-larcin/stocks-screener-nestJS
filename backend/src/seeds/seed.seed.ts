import { DataSource } from 'typeorm';
import { seedRoles } from './roles.seed';
import { seedAdmin } from './admin.seed';
import { AppDataSource } from 'src/data-sources';

async function runSeeds() {
  try {
    //? Connexion à la DB
    const dataSource: DataSource = await AppDataSource.initialize();
    console.log('DB connected');

    //1. Seed pour les rôles
    await seedRoles(dataSource);

    //2. Seed de l'utilisateur admin
    await seedAdmin(dataSource);

    console.log('Seed successfully finished');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors du seeding:', error);
    process.exit(1);
  }
}

runSeeds();
