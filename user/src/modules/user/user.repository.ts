import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from './interfaces/user.repository';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async insert(entity: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create(entity);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async findOneByPhone(phone: string): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy({ phone });
  }

  async findAll(): Promise<Array<UserEntity>> {
    return await this.userRepository.find();
  }

  async findOneById(id: number): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async update(entity: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(entity);
  }

  async delete(entity: UserEntity): Promise<UserEntity> {
    return await this.userRepository.remove(entity);
  }
}
