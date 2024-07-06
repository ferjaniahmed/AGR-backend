import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { OrderEntity } from 'src/order/entites/order.entity';
import { UserEntity } from 'src/users/entites/user.entity';

export type InviceDocument = Document;

@Schema({timestamps : true})
export class Invoice {
  @Prop({ required: true })
  dateInvoice: Date;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  client: UserEntity;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
  listOrder: OrderEntity[];
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
