import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ContextWithUser } from '../dtos/UserRole.dto';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx =
      GqlExecutionContext.create(context).getContext<ContextWithUser>();

    if (!ctx.user) {
      throw new Error(
        'CurrentUser decorator requires GqlAuthGuard to be used first',
      );
    }

    return ctx.user.id;
  },
);
