import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from './role';
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
  role: Role;
}
