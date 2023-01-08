import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateAccount1672698703213 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Account',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'shortCode',
            type: 'bigInt',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'classification',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'isAnalytical',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'nature',
            type: 'varchar',
            enum: ['D', 'C'],
            isNullable: false,
          },
          {
            name: 'level',
            type: 'bigInt',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'superiorId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: 'superiorAccount',
            columnNames: ['superiorId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'Account',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Account');
  }
}
