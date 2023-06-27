import { FoodType } from './food-type';

export class FoodEntity {
  _id?: string;
  description: string;
  name: string;
  price: number;
  image?: string;
  type: FoodType;
}
