
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TutorDocument = HydratedDocument<Tutor>;


// Subdocument cho availability
@Schema({ _id: false }) 
export class Availability {
    @Prop({ required: true })
    day: string;

    @Prop({ required: true })
    time: string; 
}

export const AvailabilitySchema = SchemaFactory.createForClass(Availability);



@Schema()
export class Tutor {
    _id: string
    @Prop({ required: true })
    // users
    userId: string;

    @Prop()
    bio: string;

    @Prop()
    experience: string;

    @Prop()
    price: number;

    @Prop()
    videoUrl: string;

    @Prop({ type: [{ day: String, time: String }], default: [] })
    availability: Availability[]


}




export const TutorSchema = SchemaFactory.createForClass(Tutor);
