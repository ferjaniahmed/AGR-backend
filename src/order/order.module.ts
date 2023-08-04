import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { OrderSchema } from './entites/order.schema';
import { AuthModule } from 'src/auth/auth.module';
import { RoleGuard } from 'src/guards/role.guard';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: 'Order',
        schema: OrderSchema,
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService,RoleGuard],
  exports: [OrderService],
})
export class OrderModule {}
