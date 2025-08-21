import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { REQUIRE_ROLES_KEY, RoleName } from 'src/decorators/require-role.decorator';

interface SessionUserShape {
  role?: RoleName | { name?: RoleName };
  roles?: RoleName[];
}

@Injectable()
export class RequireRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<RoleName[]>(REQUIRE_ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    //* 1) Si aucun rôle requis --> Acces autorisé
    if (!required || required.length === 0) {
      return true; //? Aucun rôle requis
    }

    //* 2) Récup user depuis la requête (session)

    //? Etendre le type Request d’Express pour inclure les propriétés session.user et user.

    const req = context
      .switchToHttp()
      .getRequest<Request & { session?: { user?: SessionUserShape }; user?: SessionUserShape }>();

    const sessionUser: SessionUserShape | undefined = req.session?.user ?? req.user;

    //* 3) Extraire le/les rôles de manière flexible

    const userRoles: RoleName[] = normalizeRoles(sessionUser);

    //* 4) Vérification appartenance
    const allowed = required.some((r) => userRoles.includes(r));
    if (!allowed) {
      throw new ForbiddenException(
        `Access denied. Required roles: ${required.join(', ')}. Your roles: ${userRoles.join(', ')}`,
      );
    }
    return true;
  }
}

//? Méthode d'uniformisation des formats possibles

function normalizeRoles(user?: SessionUserShape): RoleName[] {
  if (!user) return [];

  //* Si user a +ieurs rôles, vérifier que c'est bien un array et ne prendre que les string
  if (Array.isArray(user.roles)) {
    return user.roles.filter((r): r is RoleName => typeof r === 'string');
  }

  if (typeof user.role === 'string') {
    return [user.role];
  }

  if (typeof user.role === 'object' && user.role && typeof user.role.name === 'string') {
    return [user.role.name];
  }

  return [];
}
