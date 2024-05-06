import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationUserDetails1714992867594 implements MigrationInterface {
    name = 'RelationUserDetails1714992867594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_edited_at" TIMESTAMP NOT NULL DEFAULT now(), "phone" character varying(126) NOT NULL, "password" character varying(36) NOT NULL, "role" character varying(128) NOT NULL, "park_id" integer, CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_details" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "last_edited_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying(126) NOT NULL, "lastName" character varying(36) NOT NULL, "avatar" integer, "user_id" integer, CONSTRAINT "REL_ef1a1915f99bcf7a87049f7449" UNIQUE ("user_id"), CONSTRAINT "PK_fb08394d3f499b9e441cab9ca51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_details" ADD CONSTRAINT "FK_ef1a1915f99bcf7a87049f74494" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_details" DROP CONSTRAINT "FK_ef1a1915f99bcf7a87049f74494"`);
        await queryRunner.query(`DROP TABLE "user_details"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
