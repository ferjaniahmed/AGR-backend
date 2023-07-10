import { OrderEntity } from 'src/order/entites/order.entity';
import { UserEntity } from 'src/users/entites/user.entity';

export class InvoiceEntity {
  _id?: string;
  dateIvoice: Date;
  listOrder: Array<OrderEntity>;
  client: UserEntity;
}
