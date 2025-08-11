import { Injectable, NestMiddleware } from '@nestjs/common';
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
      return res.status(400).json({ error: 'Invalid Authorization header' });
    }

    try {
      const session = this.jwtService.verify<Session>(token);
      req.session = session;
      return next();
    } catch {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  }
}
