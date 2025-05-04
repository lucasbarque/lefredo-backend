import { clerkClient } from '@clerk/clerk-sdk-node';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import type { Request } from 'express';

interface ClerkRequest extends Request {
  cookies: Record<string, unknown> & { __session?: unknown };
  headers: Record<string, string | string[] | undefined>;
}

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  private readonly logger = new Logger(ClerkAuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ClerkRequest>();

    const rawRestaurantId = request.headers.restaurantid;
    if (typeof rawRestaurantId !== 'string') {
      this.logger.warn('restaurantid ausente ou em formato inválido');
      return false;
    }
    const rawMenuId = request.headers.menuid;
    if (typeof rawMenuId !== 'string') {
      this.logger.warn('menuid ausente ou em formato inválido');
      return false;
    }

    const rawSession = request.cookies.__session;
    if (typeof rawSession !== 'string') {
      this.logger.warn('cookie __session ausente ou inválido');
      return false;
    }

    try {
      const session = await clerkClient.verifyToken(rawSession);
      const user = await clerkClient.users.getUser(session.sub);

      if (user.publicMetadata.restaurantId !== rawRestaurantId) return false;
      if (user.publicMetadata.menuId !== rawMenuId) return false;
    } catch (err) {
      this.logger.error(err);
      return false;
    }

    return true;
  }
}
