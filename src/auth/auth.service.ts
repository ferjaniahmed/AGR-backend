import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/users/hash.service';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    } else {
      if (
        !((await this.hashService.comparePassword(
          pass,
          user.password,
        )) as boolean)
      ) {
        throw new UnauthorizedException();
      }
    }
    const payload = { id: user._id, email: user.email /*role*/ };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
