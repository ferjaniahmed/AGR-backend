import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { OrderEntity } from 'src/order/entites/order.entity';

export type InviceDocument = Document;

@Schema()
export class Invoice {
  @Prop({ required: true })
  dateInvoice: Date;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
  listOrder: OrderEntity[];
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
