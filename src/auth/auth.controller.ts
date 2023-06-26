import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  login(@Body() data: Record<string, string>) {
    return this.authService.signIn(data.email, data.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() request) {
    return request.user;
  }
}
