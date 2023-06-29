import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/jwt.guard';
import { UserService } from 'src/users/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userervice: UserService,
  ) {}
  @Post('login')
  login(@Body() data: Record<string, string>) {
    return this.authService.signIn(data.email, data.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() request) {
    return this.userervice.findById(request.user.id);
  }
}
