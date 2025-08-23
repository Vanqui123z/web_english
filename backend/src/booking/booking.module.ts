import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './schemas/booking.chema';
import { TutorModule } from 'src/tutors/tutors.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]), TutorModule, UsersModule],
  providers: [BookingService],
  controllers: [BookingController]
})
export class BookingModule {}
