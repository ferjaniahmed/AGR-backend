import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { ProductService } from './product.service';

@Controller('food')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Post()
  create(@Body() data: CreateFoodDto) {
    return this.productService.create(data);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() data: UpdateFoodDto) {
    return this.productService.update(id, data);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
