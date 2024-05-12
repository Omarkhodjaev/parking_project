import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserDetailService } from './user-detail.service';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleDecorator } from 'src/common/decorator/rolesDecorator';
import { RedisKeys, RoleEnum } from 'src/common/types/enums';
import { JwtAuthGuard } from '../shared/guards/auth/jwt-auth.guard';
import { RolesGuard } from '../shared/guards/role.guard';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@ApiTags('user-detail')
@Controller('user-detail')
export class UserDetailController {
  constructor(private readonly userDetailService: UserDetailService) {}

  @ApiBearerAuth()
  @RoleDecorator(RoleEnum.Admin, RoleEnum.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createUserDetailDto: CreateUserDetailDto) {
    return this.userDetailService.create(createUserDetailDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(CacheInterceptor)
  @CacheKey(RedisKeys.ALL_USER_DETAILS)
  @CacheTTL(0)
  @Get()
  findAll() {
    return this.userDetailService.findAll();
  }

  @ApiBearerAuth()
  @RoleDecorator(RoleEnum.Admin, RoleEnum.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userDetailService.findOneById(+id);
  }

  @ApiBearerAuth()
  @RoleDecorator(RoleEnum.Admin, RoleEnum.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDetailDto: UpdateUserDetailDto,
  ) {
    return this.userDetailService.update(+id, updateUserDetailDto);
  }

  @ApiBearerAuth()
  @RoleDecorator(RoleEnum.Admin, RoleEnum.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userDetailService.delete(+id);
  }
}
