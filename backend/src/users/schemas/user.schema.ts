
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

  _id: string;
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ["student", "tutor", "admin"], default: "student" })
  role: string;

  @Prop()
  bio?: string;

  @Prop()
  avatar: string;

  @Prop({enum:["active", "blocked"], default:"active"} )
  status: string;
  @Prop()
  points: number;

}

export const UserSchema = SchemaFactory.createForClass(User);
