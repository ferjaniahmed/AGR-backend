import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodSchema } from './entites/food.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Food',
        schema: FoodSchema,
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
