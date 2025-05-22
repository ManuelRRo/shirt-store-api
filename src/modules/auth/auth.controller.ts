/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  HttpCode,
  HttpStatus,
  Body,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(@Body() input: { email: string; password: string }) {
    return this.authService.authenticate(input);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getUserInfo(@Request() request) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return request.user;
  }
}
