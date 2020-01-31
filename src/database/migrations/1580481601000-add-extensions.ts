import {MigrationInterface, QueryRunner} from "typeorm";

export class addExtentions1580481601000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        // language=PostgreSQL
      await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      // language=PostgreSQL
      await queryRunner.query(`DROP EXTENSION IF EXISTS pgcrypto`);
    }

}
