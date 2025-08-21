
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BookingDocument = HydratedDocument<Booking>;

@Schema()
export class Booking {
  @Prop({type: Types.ObjectId , ref: "User" ,required:true})
  student: string;

  @Prop({type: Types.ObjectId, ref:"User", required:true })
  tutor: number;

  @Prop()
  dateTime: string;

    @Prop({enum:[" pending | confirmed | cancelled"], default:"pending"})
  status: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
