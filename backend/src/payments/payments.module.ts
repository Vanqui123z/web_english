import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment } from './schemas/payment.schema';

@Module({
  imports: [UsersService,
     MongooseModule.forFeature([{ name: Payment.name, schema: Payment }]),],
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class PaymentsModule { }
