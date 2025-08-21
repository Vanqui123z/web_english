
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema()
export class Payment {
  @Prop({type: Types.ObjectId, ref:"User", required:true})
  name: string;

  @Prop({type: Types.ObjectId, ref:"User", required:true})
  tutor: string;

  @Prop({required:true})
  amount: number;

  @Prop()
  packageId: string;

  @Prop({default:"success"})
  status: string;

  @Prop({default:0})
  pointsAwarded: number;

}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
