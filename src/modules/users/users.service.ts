import { Injectable } from '@nestjs/common';

export type User = {
  userId: number;
  email: string;
  password: string;
};

const users: User[] = [
  {
    userId: 1,
    email: 'myemail@mail.com',
    password: 'my_secure_password',
  },
];

@Injectable()
export class UsersService {
  // eslint-disable-next-line @typescript-eslint/require-await
  async findUserByname(email: string): Promise<User | undefined> {
    return users.find((user) => user.email === email);
  }
}
