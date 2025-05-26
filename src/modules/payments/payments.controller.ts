import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  RawBodyRequest,
  Req,
  Res,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Response } from 'express';
import { AppService } from 'src/app.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly appService: AppService,
  ) {}
  @HttpCode(HttpStatus.OK)
  @Post('intents')
  async createPaymentIntent(): Promise<string | null> {
    return this.paymentsService.createPaymentIntent();
  }

  @HttpCode(HttpStatus.OK)
  @Post('webhooks')
  async events(@Req() req: RawBodyRequest<Request>, @Res() res: Response) {
    await this.paymentsService.webhooksEvent(req);
    res.sendStatus(200);
  }
}
