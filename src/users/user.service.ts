import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument } from './entites/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userDocument: Model<UserDocument>) {}

  findAll() {
    try {
      return this.userDocument.find();
    } catch (error) {
      throw new HttpException(
        { reason: 'we dont have users yet !!' },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }
  findById(id: string) {
    try {
      return this.userDocument.findById(id);
    } catch (error) {
      throw new HttpException(
        { reason: 'user not found' },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }
  findByEmail(email: string) {
    return this.userDocument.find({ email: email });
  }
  create(data: CreateUserDto) {
    try {
      const newUser = new this.userDocument(data);
      return newUser.save();
    } catch (error) {
      throw new HttpException(
        { reason: 'check your information' },
        HttpStatus.NOT_ACCEPTABLE,
        { cause: error },
      );
    }
  }
  update(id: string, data: UpdateUserDto) {
    try {
      return this.userDocument.updateOne({ _id: id }, data, { new: true });
    } catch (error) {
      throw new HttpException(
        { reason: 'check your information' },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  delete(id: string) {
    try {
      return this.userDocument.deleteOne({ _id: id });
    } catch (error) {
      throw new HttpException(
        { reason: 'user not found for delete' },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }
}
