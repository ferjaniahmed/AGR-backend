import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument } from './entites/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { HashService } from './hash.service';
import { UserEntity } from './entites/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userDocument: Model<UserDocument>,
    private hashService: HashService,
  ) {}

  async findAll() {
    try {
      return await this.userDocument.find();
    } catch (error) {
      throw new HttpException(
        { reason: 'we dont have users yet !!' },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }
  async findById(id: string) {
    try {
      return await this.userDocument.findById(id);
    } catch (error) {
      throw new HttpException(
        { reason: 'user not found' },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }
  async findByEmail(email: string) {
    return await this.userDocument.findOne({ email: email });
  }
  async create(data: CreateUserDto) {
    const user: UserEntity = (await this.findByEmail(
      data.email,
    )) as unknown as UserEntity;
   // console.log(user);
    if (user) {
      throw new HttpException(
        'This email is already in use',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      data.password = (await this.hashService.hashPassword(
        data.password,
      )) as unknown as string;
      const newUser = new this.userDocument(data);

      return await newUser.save();
    } catch (error) {
      throw new HttpException(
        'check your information',
        HttpStatus.NOT_ACCEPTABLE,
        { cause: error },
      );
    }
  }
  async update(id: string, data: UpdateUserDto) {
    try {
      return await this.userDocument.updateOne({ _id: id }, data, {
        new: true,
      });
    } catch (error) {
      throw new HttpException(
        { reason: 'check your information' },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async delete(id: string) {
    try {
      return await this.userDocument.deleteOne({ _id: id });
    } catch (error) {
      throw new HttpException(
        { reason: 'user not found for delete' },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }
}
