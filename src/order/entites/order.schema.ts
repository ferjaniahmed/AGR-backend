import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Mongoose } from 'mongoose';
import { InvoiceEntity } from 'src/invoice/entities/invoice.entity';
import { FoodEntity } from 'src/product/entites/food.entity';
import { UserEntity } from 'src/users/entites/user.entity';

export type OrderDocument = Document & Order;
@Schema({
  timestamps: true,
})
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  client: UserEntity;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Food' })
  food: FoodEntity;
  @Prop({ required: true })
  quantity: number;
  @Prop({ required: true , default:false })
  isConfirmed: boolean;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Invoice', default: null })
  invoice: InvoiceEntity;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
