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
    async checkout(studentId: string, payload: { amount: number, packageId: string, tutorId?: string }) {
        if (payload.amount <= 0) { throw new BadRequestException("invaliid amount") };
        const points = this.ChangePoint(payload.amount);
        // rollback if err
        const session = await startSession();
        session.startTransaction();

        try {
            const payment = this.PaymentModel.create([{
                name: studentId,
                tutor: payload.tutorId,
                amount: payload.amount,
                packageId: payload.packageId,
                status: "success",
                pointsAwarded: points,

            }], { session })
            await this.UserModel.findByIdAndUpdate(
                studentId,
                { $inc: { points }, },
                { new: true, session }
            )
            await session.commitTransaction()
            session.endSession();

            const UserUpdated = this.UserModel.findById(studentId).select("-password")
            return { transaction: payment[0], user: UserUpdated };
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }

    }



}
