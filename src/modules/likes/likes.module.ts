import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesResolver } from './likes.resolver';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AppService } from 'src/app.service';

@Module({
  providers: [
    LikesResolver,
    LikesService,
    PrismaService,
    JwtService,
    UsersService,
    AppService,
  ],
})
export class LikesModule {}
