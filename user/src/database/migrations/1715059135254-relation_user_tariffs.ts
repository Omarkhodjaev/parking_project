import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationUserTariffs1715059135254 implements MigrationInterface {
    name = 'RelationUserTariffs1715059135254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_tariffs" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_edited_at" TIMESTAMP NOT NULL DEFAULT now(), "tariff_id" integer NOT NULL, "started_at" date NOT NULL, "ended_date" date NOT NULL, CONSTRAINT "PK_53734c7ffb274e4a3549691dcf3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_id" ("userTariffsId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_4a656565889b65cbbd1bf57accd" PRIMARY KEY ("userTariffsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f45d8bfff9954ace1a0c1fe0fb" ON "user_id" ("userTariffsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_946d0fd771a9af5abd0084664a" ON "user_id" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "user_id" ADD CONSTRAINT "FK_f45d8bfff9954ace1a0c1fe0fb3" FOREIGN KEY ("userTariffsId") REFERENCES "user_tariffs"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_id" ADD CONSTRAINT "FK_946d0fd771a9af5abd0084664ae" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_id" DROP CONSTRAINT "FK_946d0fd771a9af5abd0084664ae"`);
        await queryRunner.query(`ALTER TABLE "user_id" DROP CONSTRAINT "FK_f45d8bfff9954ace1a0c1fe0fb3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_946d0fd771a9af5abd0084664a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f45d8bfff9954ace1a0c1fe0fb"`);
        await queryRunner.query(`DROP TABLE "user_id"`);
        await queryRunner.query(`DROP TABLE "user_tariffs"`);
    }

}
