import { BaseEntity } from 'src/common/database/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity('service')
export class ServiceEntity extends BaseEntity {
  @Column({
    name: 'park_id',
    type: 'integer',
    nullable: false,
  })
  park: number;

  @Column({
    name: 'user_id',
    type: 'integer',
    nullable: false,
  })
  user: number;

  @Column({
    name: 'started_at',
    type: 'date',
    nullable: false,
  })
  startedAt: Date;

  @Column({
    name: 'ended_at',
    type: 'date',
    nullable: false,
  })
  endedAt: Date;

  @Column({
    name: 'price',
    type: 'integer',
    nullable: false,
  })
  price: number;

  @Column({
    name: 'tariff_id',
    type: 'integer',
    nullable: true,
  })
  tariff: number;
}
