import { Injectable } from '@nestjs/common';
import { Likes } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) {}
  async likedProduct(id: string): Promise<Likes | null> {
    return await this.prisma.likes.create({
      data: {
        productId: id,
        user_id: id,
      },
    });
  }
}
