import { Controller, Post,Get, Req, Body } from '@nestjs/common';
import { BookingService } from './booking.service';
import   getUserId from 'src/utils/user.decorator';
import { Roles } from 'src/common/guards/role.decorator';
@Controller('booking')
export class BookingController {
    constructor(private BookingService:BookingService){};
    @Post()
    async create(@Req() req:any, @Body() body:{tutorId:string , date: Date}){
        const studentId=getUserId(req);
        return this.BookingService.create(studentId,body.tutorId,body.date);

    }
    @Roles("tutor")
    @Get("student")
    async getByUser(@Req() req:any){
          const studentId=getUserId(req);
        return this.BookingService.findByStudent(studentId);
    } 

    @Roles("student")
    @Get("tutor")
    async getByTutor(@Req() req:any){
          const userId=getUserId(req);
        return this.BookingService.findByTutor(userId)

    }

}
