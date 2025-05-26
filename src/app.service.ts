import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(readonly configService: ConfigService) {}
  configJwtSecret(): string | undefined {
    return this.configService.get<string>('JWT_SECRET');
  }
  configStripeSecret(): string | undefined {
    return this.configService.get<string>('STRIPE_SECRET_KEY');
  }
  configWebhookSecret(): string | undefined {
    return this.configService.get<string>('STRIPE_WEBHOOB_KEY');
  }
}
