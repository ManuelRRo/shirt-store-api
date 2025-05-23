/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  logger: Logger;
  constructor(private jwtService: JwtService) {
    this.logger = new Logger();
  }

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();

    // Check both possible locations for headers
    const request = this.getRequest(context);
    const authorization = request.headers?.authorization;
    const token: string = authorization?.split(' ')[1];
    this.logger.debug(token, 'TOKEN');

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      this.logger.debug('here');
      const tokenPayload = await this.jwtService.verifyAsync(token, {
        secret: 'first_only_matter_you_cha_in_ttle_le_lls_eadl',
      });
      this.logger.debug('Payload', token);
      ctx.user = {
        userId: tokenPayload.sub,
        email: tokenPayload.email,
      };
      return true;
    } catch (error) {
      this.logger.debug(error.message);
      throw new UnauthorizedException('Invalid token');
    }
  }

  getRequest(context: ExecutionContext) {
    if (context.getType<'graphql'>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return gqlContext.getContext().req;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return context.switchToHttp().getRequest();
  }
}
