import { Controller, Post, Get, Req, Body, NotFoundException, Param, Patch } from '@nestjs/common';
import { BookingService } from './booking.service';
import getUserId from 'src/utils/user.decorator';
import { Roles } from 'src/common/guards/role.decorator';
import { TutorsService } from 'src/tutors/tutors.service';
@Controller('booking')
export class BookingController {
    constructor(private BookingService: BookingService, private TutorService: TutorsService) { };
    @Post()
    async create(@Req() req: any, @Body() body: { tutorId: string, date: Date }) {
        const studentId = getUserId(req);
        return this.BookingService.create(studentId, body.tutorId, body.date);

    }
    @Roles("tutor")
    @Get("student")
    async getStudents(@Req() req: any) {
        const userId = getUserId(req);

        // 1. lấy tất cả tutors do user này tạo
        const tutors = await this.TutorService.findAllTutorByUser(userId);
        if (!tutors || tutors.length === 0) {
            throw new NotFoundException("No tutors found for this user");
        }
        // 2. gom tất cả tutor._id
        const tutorIds = tutors.map(t => t._id);
        // 3. tìm tất cả học viên duy nhất mà các tutor này đã dạy
        return this.BookingService.findStudentsByTutor(tutorIds);
    }

    @Roles("tutor")
    @Patch("status/:bookingId")
    async updateBooking(@Param("bookingId") bookingId: string, @Body("status") status: "confirmed" | "rejected") {
        return this.BookingService.updateBooking(bookingId, status);
    }

    @Roles("student")
    @Get("courses")
    async getTutors(@Req() req: any) {
        const studentId = getUserId(req);
        return this.BookingService.findTutorsByStudent(studentId);
    }
}
