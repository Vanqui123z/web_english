import { Body, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Booking } from './schemas/booking.chema';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class BookingService {

       constructor(
              @InjectModel(Booking.name) private bookingModal: Model<Booking>,
              @InjectModel(User.name) private userModel: Model<User>,
       ) { }

       async create(studentId: string, tutorId: string, date: Date) {
              const booking = new this.bookingModal({ student: studentId, tutor: tutorId, dateTime: date });
              return booking.save();
       }
       async findStudentsByTutor(tutorIds: string[]) {
              const stringTutorIds = tutorIds.map(id => id.toString());

              // lấy danh sách booking có cả student & tutor
              const bookings = await this.bookingModal
                     .find({ tutor: { $in: stringTutorIds } })
                     .populate("student", "name email") 
                     .populate("tutor", "bio price")    
                     .lean();

              // lọc ra student duy nhất theo tutor
              const result = bookings.map(b => ({
                     bookingId: b._id,
                     student: b.student,
                     tutor: b.tutor,
                     status: b.status
              }));

              return result;
       }





       // tìm tutor mà student đã book
       async findTutorsByStudent(studentId: string) {
              return this.bookingModal
                     .find({ student: studentId })
                     .populate({
                            path: "tutor",
                            select: "userId bio experience price",
                            populate: {
                                   path: "userId",
                                   select: "name email"
                            }
                     });
       }
       async updateBooking(bookingId: string, @Body("status") status: string) {
              return this.bookingModal.findByIdAndUpdate(bookingId, { status }, { new: true });
       }

}

