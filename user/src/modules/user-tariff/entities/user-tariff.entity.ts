import { BaseEntity } from 'src/common/database/baseEntity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany } from 'typeorm';

@Entity('user_tariffs')
export class UserTariffEntity extends BaseEntity {
  
  @Column({
    name: 'tariff_id',
    type: 'integer',
    nullable: false,
  })
  tariff: number;
  
  @Column({
    name: 'started_at',
    type: 'date',
    nullable: false,
  })
  startedAt: Date;
  
  @Column({
    name: 'ended_date',
    type: 'date',
    nullable: false,
  })
  endedAt: Date;

  
  @ManyToMany(() => UserEntity, (user) => user.userTariff)
  @JoinTable()
  user: UserEntity[];
}
