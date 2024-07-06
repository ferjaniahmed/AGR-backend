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
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from 'src/users/entites/role';
import { Roles } from 'src/decorator/role.decorator';

@Controller('food')
@UseGuards(AuthGuard(), RoleGuard)
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() data: CreateFoodDto) {
    return this.productService.create(data);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch('/:id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() data: UpdateFoodDto) {
    return this.productService.update(id, data);
  }

  @Delete('/:id')
  @Roles(Role.ADMIN)
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
