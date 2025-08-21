import { Controller, Post,Get, Req, Body } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
    constructor(private BookingService:BookingService){};
    @Post()
    async create(@Req() req:any, @Body() body:{tutorId:string , date: Date}){
        const studentId = req.user.userId;
        return this.BookingService.create(studentId,body.tutorId,body.date);

    }

    @Get("student")
    async getByUser(@Req() req:any){
       const studentId = req.user.userId;
        return this.BookingService.findByStudent(studentId);

    }

    @Get("tutor")
    async getByTutor(@Req() req:any){
       const tutorId = req.user.userId;
        return this.BookingService.findByTutor(tutorId);

    }

}
