import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { Session } from 'src/shared/interfaces/session.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request & { session: Session }, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      next();
      return;
    }

    const [type, token] = req.headers.authorization.split(' ');

    if (type.toLowerCase() !== 'bearer') {
      throw new Error('Invalid type');
    }

    try {
      const session = this.jwtService.verify<Session>(token);
      req.session = session;
    } catch {
      throw new Error('Invalid or expired token');
    }
    next();
  }
}
