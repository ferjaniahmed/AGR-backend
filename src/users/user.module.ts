import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entites/user.schema';
import { HashService } from './hash.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from 'src/guards/role.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    HashService,
    JwtService,
  ],
  exports: [UserService, HashService],
})
export class UserModule {}
