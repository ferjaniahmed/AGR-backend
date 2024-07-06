import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from 'src/auth/constant';
import { UserDocument } from 'src/users/entites/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload) {
    const { id } = payload;

    const user = await this.userModel.findById(id);

    if (!user) {
      throw new UnauthorizedException('need login to access at this endpoint');
    }
    return user;
  }
}
