import { BaseEntity } from 'src/common/database/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity('parks')
export class ParkEntity extends BaseEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 126,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'owner',
    type: 'integer',
    nullable: true,
  })
  owner: number;

  @Column({
    name: 'image',
    type: 'integer',
    nullable: true,
  })
  image: number;
}
