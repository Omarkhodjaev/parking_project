import { BaseEntity } from 'src/common/database/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity('tariffs')
export class TariffEntity extends BaseEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'price',
    type: 'integer',
    nullable: false,
  })
  price: number;

  @Column({
    name: 'time',
    type: 'date',
    nullable: false,
  })
  time: Date;

  @Column({
    name: 'park_id',
    type: 'integer',
    nullable: true,
  })
  park: number;
}
