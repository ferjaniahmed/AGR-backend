import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
//import { AuthGuard } from 'src/guards/jwt.guard';
import { UserService } from 'src/users/user.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtStrategy: JwtStrategy,
  ) {}
  @Post('login')
  login(@Body() data: Record<string, string>) {
    return this.authService.signIn(data.email, data.password);
  }

  @UseGuards(AuthGuard())
  @Get('profile')
  getProfile(@Req() request) {
    return request.user;
  }
}
