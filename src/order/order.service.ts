import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDocument } from './entites/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private orderDocument: Model<OrderDocument>,
  ) {}
  async findAll() {
    try {
      return await this.orderDocument
        .find()
        .populate('client')
        .populate('food');
    } catch (error) {
      throw new HttpException(
        { reason: 'we dont have order yet !!' },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }

  async findOne(id: string) {
    try {
      return await this.orderDocument.findOne({ _id: id });
    } catch (error) {
      throw new HttpException(
        { reason: 'we dont have this order yet !!' },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }

  async create(data: CreateOrderDto) {
    try {
      const newProduct = new this.orderDocument(data);
      return await newProduct.save();
    } catch (error) {
      throw new HttpException(
        { reason: 'check your information' },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async update(id: string, data: UpdateOrderDto) {
    try {
      return await this.orderDocument.updateOne({ _id: id }, data, {
        new: true,
      });
    } catch (error) {
      throw new HttpException(
        { reason: 'we dont have this order yet for update !!' },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async delete(id: string) {
    try {
      return await this.orderDocument.deleteOne({ _id: id });
    } catch (error) {
      throw new HttpException(
        { reason: 'we dont have this order for delete !!' },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }
}
