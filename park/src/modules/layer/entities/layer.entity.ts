import { BaseEntity } from 'src/common/database/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity('layers')
export class LayerEntity extends BaseEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 126,
    nullable: true,
  })
  name: string;

  @Column({
    name: 'floor',
    type: 'integer',
    nullable: true,
  })
  floor: number;

  @Column({
    name: 'park_id',
    type: 'integer',
    nullable: false,
  })
  park: number;
}
