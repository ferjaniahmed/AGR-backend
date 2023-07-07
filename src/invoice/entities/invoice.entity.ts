import { OrderEntity } from 'src/order/entites/order.entity';

export class InvoiceEntity {
  _id?: string;
  dateIvoice: Date;
  listOrder: Array<OrderEntity>;
}
