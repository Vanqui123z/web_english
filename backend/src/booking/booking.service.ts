import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Booking } from './schemas/booking.chema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BookingService {
     constructor(@InjectModel((Booking.name)) private readonly bookingModal: Model<Booking>) {};

     async create(studentId:string, tutorId:string, date: Date){
            const booking = new this.bookingModal({student:studentId, tutor:tutorId , dateTime:date});
            return booking.save() ;
     }
     async findByTutor(tutorId:string){
       // populate : Join với collection student, chỉ lấy field name và email
            return this.bookingModal.find({tutor:tutorId}).populate("student","email name")
     }
     async findByStudent(studentId:string){
            return this.bookingModal.find({student:studentId}).populate("tutor","email name")


     }

}
