import { BaseEntity } from 'src/common/database/baseEntity';
import { Column, Entity } from 'typeorm';

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
    type: 'integer',
    nullable: true,
  })
  avatar: number;

  @Column({
    name: 'user_id',
    type: 'integer',
    nullable: false,
  })
  user: number;
}
