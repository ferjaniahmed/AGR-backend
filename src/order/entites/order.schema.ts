import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { InvoiceEntity } from 'src/invoice/entities/invoice.entity';
import { FoodEntity } from 'src/product/entites/food.entity';
import { UserEntity } from 'src/users/entites/user.entity';

export type OrderDocument = Document & Order;
@Schema()
export class Order {
  @Prop({ required: true })
  dateOrder: Date;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  client: UserEntity;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Food' })
  food: FoodEntity;
  @Prop({
    default: false,
  })
  isInvoiced: boolean;
  @Prop({ required: true })
  quantity: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Invoice', default: null })
  invoice: InvoiceEntity;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
