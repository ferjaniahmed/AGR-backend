import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/users/entites/role';

@Controller('order')
@UseGuards(AuthGuard(), RoleGuard)
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.orderService.findAll();
  }

  @Post()
  create(@Body() data: CreateOrderDto) {
    return this.orderService.create(data);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() data: UpdateOrderDto) {
    return this.orderService.update(id, data);
  }

  @Delete('/:id')
  @Roles(Role.ADMIN)
  delete(@Param('id') id: string) {
    return this.orderService.delete(id);
  }
}
