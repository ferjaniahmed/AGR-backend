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
  findAll() {}

  @Post()
  create(@Body() data: CreateFoodDto) {}

  @Get('/:id')
  findOne(@Param('id') id: string) {}

  @Patch('/:id')
  update(@Param('id') id: string, @Body() data: UpdateFoodDto) {}

  @Delete('/:id')
  delete(@Param('id') id: string) {}
}
