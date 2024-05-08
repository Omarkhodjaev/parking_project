import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserTariffService } from './user-tariff.service';
import { CreateUserTariffDto } from './dto/create-user-tariff.dto';
import { UpdateUserTariffDto } from './dto/update-user-tariff.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user-tariff')
@Controller('user-tariff')
export class UserTariffController {
  constructor(private readonly userTariffService: UserTariffService) {}

  @Post()
  create(@Body() createUserTariffDto: CreateUserTariffDto) {
    
    return this.userTariffService.create(createUserTariffDto);
  }

  @Get()
  findAll() {
    return this.userTariffService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTariffService.findOneById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserTariffDto: UpdateUserTariffDto,
  ) {
    return this.userTariffService.update(+id, updateUserTariffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTariffService.delete(+id);
  }
}
