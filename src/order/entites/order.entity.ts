import { FoodEntity } from 'src/product/entites/food.entity';
import { UserEntity } from 'src/users/entites/user.entity';

export class OrderEntity {
  _id?: string;
  dateOrder: Date;
  food: FoodEntity | string;
  client: UserEntity | string;
  isInvoiced: boolean;
  quantity : number
}
