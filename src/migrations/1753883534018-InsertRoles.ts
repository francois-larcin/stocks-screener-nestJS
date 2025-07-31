import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertRoles1753883534018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Autoriser l'insertion avec ID précis
    await queryRunner.query(`SET IDENTITY_INSERT roles ON`);

    await queryRunner.query(`
            INSERT INTO roles (id, name, description) VALUES
            (1, 'admin', 'Administrateur avec tous les droits'),
            (2, 'user', 'Utilisateur standard')
        `);

    await queryRunner.query(`SET IDENTITY_INSERT roles OFF`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Si on rollback, on supprime seulement ces deux rôles
    await queryRunner.query(`DELETE FROM roles WHERE id IN (1,2)`);
  }
}
