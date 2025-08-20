import { SetMetadata } from '@nestjs/common';

export const REQUIRE_ROLES_KEY = 'require-roles';

export type RoleName = 'admin' | 'user';

export const RequireRoles = (...roles: RoleName[]) => SetMetadata(REQUIRE_ROLES_KEY, roles);
