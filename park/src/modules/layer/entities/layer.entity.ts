import { BaseEntity } from 'src/common/database/baseEntity';
import { ParkEntity } from 'src/modules/park/entities/park.entity';
import { PlaceEntity } from 'src/modules/place/entities/place.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

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

  @ManyToOne(() => ParkEntity, (Park) => Park.layers)
  @JoinColumn({ name: 'park_id' })
  park: ParkEntity;

  @OneToMany(() => PlaceEntity, (place) => place.layer)
  @JoinColumn({ name: 'place_id' })
  places: PlaceEntity[];
}
