import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodSchema } from './entites/food.schema';
import { AuthModule } from 'src/auth/auth.module';
import { RoleGuard } from 'src/guards/role.guard';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: 'Food',
        schema: FoodSchema,
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, RoleGuard],
  exports: [ProductService],
})
export class ProductModule {}
