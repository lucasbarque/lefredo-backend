import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class DelayMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    // Atraso de 2 segundos (2000 milissegundos)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    next();
  }
}
