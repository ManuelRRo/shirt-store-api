import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';

type AuthInput = { email: string; password: string };
type SignInData = { userId: number; email: string };
type AuthResult = { sessionToken: string };

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.signIn(user);
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.userService.findUserByname(input.email);

    if (user && user.password === input.password) {
      return {
        userId: user.userId,
        email: user.email,
      };
    }
    return null;
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.userId,
      email: user.email,
    };

    const sessionToken = await this.jwtService.signAsync(tokenPayload);

    return { sessionToken };
  }
}
