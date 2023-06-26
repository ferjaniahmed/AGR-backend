import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';

@Module({
  controllers: [AuthController],
  imports: [UserModule,JwtModule.register({
    global : true,
    secret : jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  })],
  providers: [AuthService],
})
export class AuthModule {}
