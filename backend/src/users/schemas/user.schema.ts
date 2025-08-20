
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required:true })
  name: string;

  @Prop({ unique: true , required: true })
  email: string;

  @Prop({required: true})
  password: string;

  @Prop({enum: ["student","tutor","admin"], default:"student"})
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
