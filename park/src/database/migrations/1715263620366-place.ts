import { MigrationInterface, QueryRunner } from "typeorm";

export class Place1715263620366 implements MigrationInterface {
    name = 'Place1715263620366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "places" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_edited_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(126) NOT NULL, "price" integer NOT NULL, "layer_id" integer, CONSTRAINT "PK_1afab86e226b4c3bc9a74465c12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "places" ADD CONSTRAINT "FK_939b21ec3f50a78846a27f875a4" FOREIGN KEY ("layer_id") REFERENCES "layers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "places" DROP CONSTRAINT "FK_939b21ec3f50a78846a27f875a4"`);
        await queryRunner.query(`DROP TABLE "places"`);
    }

}
