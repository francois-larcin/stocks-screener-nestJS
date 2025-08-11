import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Session } from 'src/shared/interfaces/session.interface';

@Injectable()
export class ConnectedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request & { session: Session } = context.switchToHttp().getRequest();

    const session = request.session;

    if (!session || !session.id) {
      return false;
    }
    return true;
  }
}
