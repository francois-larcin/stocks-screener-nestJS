import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { NextFunction, Request, Response } from 'express';
import { Session } from 'src/shared/interfaces/session.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request & { session: Session }, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;
    if (!auth) {
      return next();
    }

    const [type, token] = auth.split(' ');
    if (!type || type.toLowerCase() !== 'bearer') {
      throw new BadRequestException('Invalid Authorization header');
    }

    try {
      const session = this.jwtService.verify<Session>(token);
      req.session = session;
      return next();
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
