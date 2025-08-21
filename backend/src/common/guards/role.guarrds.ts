
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<String[]>("roles", context.getHandler()|| []);
    if (!roles.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if(!user || !roles.includes(user.role)){
        throw new ForbiddenException("insufficient role");
    }
    return true;
  }
}


// lấy metadata @Roles("admin")
// nếu ko có metadata thì endpoint public
//         có thì kiểm tra role(metadata)=== user.role không 
