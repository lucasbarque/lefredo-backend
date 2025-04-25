import { clerkClient } from '@clerk/clerk-sdk-node';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  private readonly logger = new Logger();

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    try {
      const { restaurantid, menuid } = request.headers;

      if (!restaurantid || !menuid) return false;

      const session = await clerkClient.verifyToken(request.cookies.__session);
      const user = await clerkClient.users.getUser(session.sub);

      if (user.publicMetadata.restaurantId !== restaurantid) return false;

      if (user.publicMetadata.menuId !== menuid) return false;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
    return true;
  }
}
