import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { REQUIRE_ROLES_KEY, RoleName } from 'src/decorators/require-role.decorator';

@Injectable()
export class RequireRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<RoleName[]>(REQUIRE_ROLES_KEY, context.getHandler());

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; //? Aucun rôle requis
    }

    const request = context
      .switchToHttp()
      .getRequest<{ session?: { user?: { role?: { name?: RoleName } } } }>();
    const user = request.session?.user as { role?: { name?: RoleName } };

    if (!user || !user.role || !user.role.name) {
      return false;
    }
    return requiredRoles.includes(user.role.name);
  }
}
