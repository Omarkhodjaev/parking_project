import { BaseEntity } from 'src/common/database/baseEntity';
import { RoleEnum } from 'src/common/types/enums';
import { UserDetailEntity } from 'src/modules/user-detail/entities/user-detail.entity';
import { UserTariffEntity } from 'src/modules/user-tariff/entities/user-tariff.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToOne } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({
    name: 'phone',
    type: 'varchar',
    length: 126,
    nullable: false,
    unique: true,
  })
  phone: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 36,
    nullable: false,
  })
  password: string;

  @Column({
    name: 'role',
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  role: RoleEnum;

  @Column({
    name: 'park_id',
    type: 'int',
    nullable: true,
  })
  parkId: number;

  @OneToOne(() => UserDetailEntity, (userDetail) => userDetail.user)
  userDetail: UserDetailEntity;


  
}
