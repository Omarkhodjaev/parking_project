import { BaseEntity } from 'src/common/database/baseEntity';
import { RoleEnum } from 'src/common/types/enums';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('user_details')
export class UserDetailEntity extends BaseEntity {
  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 126,
    nullable: false,
  })
  firstName: string;

  @Column({
    name: 'lastName',
    type: 'varchar',
    length: 36,
    nullable: false,
  })
  lastName: string;

  @Column({
    name: 'avatar',
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  avatar: string;

  @OneToOne(() => UserEntity, (user) => user.userDetail)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
