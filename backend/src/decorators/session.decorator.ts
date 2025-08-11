// src/decorators/session.decorator.ts
import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Session } from 'src/shared/interfaces/session.interface';

export const SessionUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): Session => {
    const req = ctx.switchToHttp().getRequest<Request>();
    if (!req.session) throw new UnauthorizedException();
    return req.session;
  },
);
