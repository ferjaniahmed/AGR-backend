import { IsEmail, IsNotEmpty } from 'class-validator';
export class UserEntity {
  _id?: string;
  @IsNotEmpty()
  firstName: string;
  lastName: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  address: string;
  dateOfBirth: Date;
}
