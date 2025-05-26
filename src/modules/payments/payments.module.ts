import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { AppService } from 'src/app.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, AppService],
})
export class PaymentsModule {}
