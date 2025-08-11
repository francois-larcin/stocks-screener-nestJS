import { RoleEnum } from '../enum/role.enum';

export interface Session {
  id?: string;
  role?: RoleEnum;
}
