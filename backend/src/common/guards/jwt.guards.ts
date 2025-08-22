// src/common/guards/jwt.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { IS_PUBLIC_KEY } from "./role.decorator"
import { Reflector } from '@nestjs/core';
const JWT_SECRET = process.env.JWT_SECRET || 'default JWT_SECRET';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(ctx: ExecutionContext): boolean {
    // config Public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (isPublic) return true;
    // check token
    const req = ctx.switchToHttp().getRequest();

    const auth = req.headers['authorization'];
    const token = auth.split(" ")[1];
    if (!token) throw new UnauthorizedException('No token');
    try {
      const payload = jwt.verify(token, JWT_SECRET) as any;
      req.user = payload;
      return true;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
