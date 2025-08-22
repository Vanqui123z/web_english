import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './schemas/payment.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule,
     MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),],
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class PaymentsModule { }
