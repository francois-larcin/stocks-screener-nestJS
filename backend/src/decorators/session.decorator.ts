import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Session } from 'src/shared/interfaces/session.interface';

/**
 * @usage
 *  - @SessionUser()            -> retourne l'objet Session
 *  - @SessionUser('id')        -> retourne string (id user)
 *  - @SessionUser('role')      -> retourne UserRole (ou ce que tu as typé)
 */
export const SessionUser = createParamDecorator(
  <K extends keyof Session>(data: K | undefined, ctx: ExecutionContext): Session | Session[K] => {
    const req = ctx.switchToHttp().getRequest<Request & { session?: Session }>();
    const session = req.session;
    if (!session) throw new UnauthorizedException('No active session');

    //? Si une clé est demandée, renvoyer juste ce champ
    return data ? session[data] : session;
  },
);
