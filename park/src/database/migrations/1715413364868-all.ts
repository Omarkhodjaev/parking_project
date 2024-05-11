import { MigrationInterface, QueryRunner } from "typeorm";

export class All1715413364868 implements MigrationInterface {
    name = 'All1715413364868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "parks" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_edited_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(126) NOT NULL, "owner" integer, "image" integer, CONSTRAINT "PK_035f21558c39565edbf33f03210" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tariffs" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_edited_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "price" integer NOT NULL, "time" character varying NOT NULL, "park_id" integer, CONSTRAINT "PK_7f32baf8d8b4bb0cf4d7ac97741" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "places" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_edited_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(126) NOT NULL, "price" integer NOT NULL, "layer_id" integer NOT NULL, CONSTRAINT "PK_1afab86e226b4c3bc9a74465c12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "layers" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_edited_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(126), "floor" integer, "park_id" integer NOT NULL, CONSTRAINT "PK_611c9a60a779f18c5e55e1f31b5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "layers"`);
        await queryRunner.query(`DROP TABLE "places"`);
        await queryRunner.query(`DROP TABLE "tariffs"`);
        await queryRunner.query(`DROP TABLE "parks"`);
    }

}
