import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserDetailService } from './user-detail.service';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';

@Controller()
export class UserDetailController {
  constructor(private readonly userDetailService: UserDetailService) {}

  @MessagePattern('createUserDetail')
  create(@Payload() createUserDetailDto: CreateUserDetailDto) {
    return this.userDetailService.create(createUserDetailDto);
  }

  @MessagePattern('findAllUserDetail')
  findAll() {
    return this.userDetailService.findAll();
  }

  @MessagePattern('findOneUserDetail')
  findOne(@Payload() id: number) {
    return this.userDetailService.findOne(id);
  }

  @MessagePattern('updateUserDetail')
  update(@Payload() updateUserDetailDto: UpdateUserDetailDto) {
    return this.userDetailService.update(
      updateUserDetailDto.id,
      updateUserDetailDto,
    );
  }

  @MessagePattern('removeUserDetail')
  remove(@Payload() id: number) {
    return this.userDetailService.remove(id);
  }
}
