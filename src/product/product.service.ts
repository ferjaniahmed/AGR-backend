import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FoodDocument } from './entites/food.schema';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Food') private foodDocument: Model<FoodDocument>) {}
  async findAll() {
    try {
      return await this.foodDocument.find();
    } catch (error) {
      throw new HttpException(
        { reason: 'we dont have food yet !!' },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }

  async findOne(id: string) {
    try {
      return await this.foodDocument.findOne({ _id: id });
    } catch (error) {
      throw new HttpException(
        { reason: 'we dont have this food yet !!' },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }

  async create(data: CreateFoodDto) {
    try {
      const newProduct = new this.foodDocument(data);
      return await newProduct.save();
    } catch (error) {
      throw new HttpException(
        { reason: 'check your information' },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async update(id: string, data: UpdateFoodDto) {
    try {
      return await this.foodDocument.updateOne({ _id: id }, data, {
        new: true,
      });
    } catch (error) {
      throw new HttpException(
        { reason: 'we dont have this food yet for update !!' },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async delete(id: string) {
    try {
      return await this.foodDocument.deleteOne({ _id: id });
    } catch (error) {
      throw new HttpException(
        { reason: 'we dont have this food for delete !!' },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }
}
