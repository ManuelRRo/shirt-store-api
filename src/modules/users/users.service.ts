import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

export type User = {
  id: string;
  email: string;
  password: string;
};

// const users: User[] = [
//   {
//     userId: 1,
//     email: 'myemail@mail.com',
//     password: 'my_secure_password',
//   },
// ];

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  // eslint-disable-next-line @typescript-eslint/require-await
  async findUserByname(email: string): Promise<User | null> {
    const user = await this.prisma.users.findUnique({
      where: {
        email, // Your email variable here
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    return user;
  }

  async getUserWithRoles(id: string) {
    const userWithRoles = await this.prisma.users.findUnique({
      where: { id },
      select: {
        roles: {
          select: {
            roles: true, // Include the roles relation
          },
        },
      },
    });

    return userWithRoles;
  }
}
