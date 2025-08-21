
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import jwt from "jsonwebtoken";
const JWT_SECRET = 'supersecret';

@Injectable()
export class JwtGuard  implements CanActivate {
    canActivate(context: ExecutionContext):boolean {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers["authorization"];
        if (!authHeader) throw new Error("No token");
        try {
            const token = authHeader.split(" ")[1];

        const payload = jwt.verify(token, JWT_SECRET) as any ;
        req.user(payload)
        return true;
        } catch (error) {
            throw new UnauthorizedException("Invalid token ")
        }
    }
}
