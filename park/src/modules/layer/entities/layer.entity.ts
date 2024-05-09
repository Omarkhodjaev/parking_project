import { BaseEntity } from 'src/common/database/baseEntity';
import { ParkEntity } from 'src/modules/park/entities/park.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

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
    nullable: this,
  })
  floor: number;

  @ManyToOne(() => ParkEntity, (Park) => Park.layers)
  park: ParkEntity;
}
