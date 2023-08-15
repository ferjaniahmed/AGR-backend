import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './entites/role';
import { Roles } from 'src/decorator/role.decorator';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from '@nestjs/passport';
//import { AuthGuard } from 'src/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  findAll() {
    return this.userService.findAll();
  }
  @Get('/:id')
  @UseGuards(AuthGuard(), RoleGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }
  @Post('')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Patch('/:id')
  @UseGuards(AuthGuard(), RoleGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('/:id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
