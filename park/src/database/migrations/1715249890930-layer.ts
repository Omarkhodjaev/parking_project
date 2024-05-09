import { MigrationInterface, QueryRunner } from "typeorm";

export class Layer1715249890930 implements MigrationInterface {
    name = 'Layer1715249890930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "layers" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_edited_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(126) NOT NULL, "floor" integer NOT NULL, "parkId" integer, CONSTRAINT "PK_611c9a60a779f18c5e55e1f31b5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "layers" ADD CONSTRAINT "FK_50c7223182064a807b098ccf5c6" FOREIGN KEY ("parkId") REFERENCES "parks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "layers" DROP CONSTRAINT "FK_50c7223182064a807b098ccf5c6"`);
        await queryRunner.query(`DROP TABLE "layers"`);
    }

}
