import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login-user.dto';
import { RoleDecorator } from 'src/common/decorator/rolesDecorator';
import { RoleEnum } from 'src/common/types/enums';
import { JwtAuthGuard } from '../shared/guards/auth/jwt-auth.guard';
import { RolesGuard } from '../shared/guards/role.guard';

@ApiTags('user-service')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  login(@Body() createUserDto: LoginDto) {
    return this.userService.login(createUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @RoleDecorator(RoleEnum.Admin, RoleEnum.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOneById(id);
  }

  @ApiBearerAuth()
  @RoleDecorator(RoleEnum.Admin, RoleEnum.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @RoleDecorator(RoleEnum.Admin, RoleEnum.Owner)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
