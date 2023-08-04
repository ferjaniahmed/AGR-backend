import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FoodDocument = Document & Food;

@Schema({
  timestamps: true,
})
export class Food {
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: false })
  image: string;
}

export const FoodSchema = SchemaFactory.createForClass(Food);
