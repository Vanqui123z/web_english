import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from './schemas/payment.schema';
import { Model, startSession } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class PaymentsService {
    constructor(@InjectModel(Payment.name) private PaymentModel: Model<Payment>,
        @InjectModel(User.name) private UserModel: Model<User>
    ) { }

    private ChangePoint(amount: number) {
        return Math.floor(amount / 1000);

    }
async checkout(studentId: string, tutorId: string, payload: { amount: number, packageId: string }) {
  if (payload.amount <= 0) {
    throw new BadRequestException('Invalid amount');
  }
  const points = this.ChangePoint(payload.amount);
  const payment = await this.PaymentModel.create({
    name: studentId,
    tutor: tutorId,
    amount: payload.amount,
    packageId: payload.packageId,
    status: 'success',
    pointsAwarded: points,
  });
  const updatedUser = await this.UserModel.findByIdAndUpdate(
    studentId,
    { $inc: { points } },
    { new: true }
  );
  const userUpdated = await this.UserModel.findById(studentId).select('-password');
  return { transaction: payment, user: userUpdated };
}



}
