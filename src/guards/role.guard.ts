import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { jwtConstants } from 'src/auth/constant';
import { ROLE_KEY } from 'src/decorator/role.decorator';
import { Role } from 'src/users/entites/role';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // get the required role from @Role annotation
    const requiredRoles = this.reflector.getAllAndOverride<Role>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    //extract Token From Header
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    //verif token
    const payload = await this.jwtService.verifyAsync(token, {
      secret: jwtConstants.secret,
    });

    if (!requiredRoles) {
      return true;
    }

    if (payload.role !== requiredRoles) {
      throw new UnauthorizedException('you dont have access to this endpoint');
    } else {
      return true;
    }
  }

  private extractTokenFromHeader(request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
