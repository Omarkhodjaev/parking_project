import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UserDetailEntity } from './entities/user-detail.entity';
import { IUserDetailRepository } from './interfaces/user-detail.repository';
import { Repository } from 'typeorm';

export class UserDetailRepository implements IUserDetailRepository {
  constructor(
    @InjectRepository(UserDetailEntity)
    private readonly userDetailRepository: Repository<UserDetailEntity>,
  ) {}

  async insert(dto: CreateUserDetailDto): Promise<UserDetailEntity> {
    const entity = this.userDetailRepository.create(dto);
    
    const newUserDetail = await this.userDetailRepository.save(entity);

    return newUserDetail;
  }

  async findAll(): Promise<UserDetailEntity[]> {
    return await this.userDetailRepository.find();
  }

  async findOneById(id: number): Promise<UserDetailEntity> {
    return await this.userDetailRepository.findOneBy({ id });
  }

  async update(entity: UserDetailEntity): Promise<UserDetailEntity> {
    return await this.userDetailRepository.save(entity);
  }

  async delete(entity: UserDetailEntity): Promise<UserDetailEntity> {
    return await this.userDetailRepository.remove(entity);
  }
}
