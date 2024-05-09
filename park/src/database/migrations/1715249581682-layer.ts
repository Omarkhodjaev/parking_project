import { MigrationInterface, QueryRunner } from "typeorm";

export class Layer1715249581682 implements MigrationInterface {
    name = 'Layer1715249581682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Layers" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_edited_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(126) NOT NULL, "floor" integer NOT NULL, "parkId" integer, CONSTRAINT "PK_b8e8ed66b04d44484462c33d9c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Layers" ADD CONSTRAINT "FK_b369a9444fa7065fcb722496a61" FOREIGN KEY ("parkId") REFERENCES "parks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Layers" DROP CONSTRAINT "FK_b369a9444fa7065fcb722496a61"`);
        await queryRunner.query(`DROP TABLE "Layers"`);
    }

}
