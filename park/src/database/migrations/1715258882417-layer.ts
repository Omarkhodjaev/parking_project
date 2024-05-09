import { MigrationInterface, QueryRunner } from "typeorm";

export class Layer1715258882417 implements MigrationInterface {
    name = 'Layer1715258882417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "layers" DROP CONSTRAINT "FK_50c7223182064a807b098ccf5c6"`);
        await queryRunner.query(`ALTER TABLE "layers" DROP COLUMN "parkId"`);
        await queryRunner.query(`ALTER TABLE "layers" ADD "park_id" integer`);
        await queryRunner.query(`ALTER TABLE "layers" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "layers" ALTER COLUMN "floor" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "layers" ADD CONSTRAINT "FK_c9106e43cd54f02f162061b1881" FOREIGN KEY ("park_id") REFERENCES "parks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "layers" DROP CONSTRAINT "FK_c9106e43cd54f02f162061b1881"`);
        await queryRunner.query(`ALTER TABLE "layers" ALTER COLUMN "floor" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "layers" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "layers" DROP COLUMN "park_id"`);
        await queryRunner.query(`ALTER TABLE "layers" ADD "parkId" integer`);
        await queryRunner.query(`ALTER TABLE "layers" ADD CONSTRAINT "FK_50c7223182064a807b098ccf5c6" FOREIGN KEY ("parkId") REFERENCES "parks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
