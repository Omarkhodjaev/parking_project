import { BaseEntity } from 'src/common/database/baseEntity';
import { LayerEntity } from 'src/modules/layer/entities/layer.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('places')
export class PlaceEntity extends BaseEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 126,
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
    name: 'layer_id',
    type: 'integer',
    nullable: false,
  })
  layer: number;
}
