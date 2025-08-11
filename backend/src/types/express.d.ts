// src/types/express.d.ts
import 'express';
import { Session } from 'src/shared/interfaces/session.interface';

declare module 'express-serve-static-core' {
  interface Request {
    session?: Session;
  }
}
