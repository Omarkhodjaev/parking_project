import { MigrationInterface, QueryRunner } from "typeorm";

export class Park1715196636877 implements MigrationInterface {
    name = 'Park1715196636877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parks" DROP CONSTRAINT "UQ_c0083b667f0488512b094512521"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parks" ADD CONSTRAINT "UQ_c0083b667f0488512b094512521" UNIQUE ("name")`);
    }

}
