import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TutorsService } from './tutors.service';

@Controller('tutors')
export class TutorsController {
    constructor(private TutorService:TutorsService){}
     @Post()
    async create(@Body() body:any ){
        return this.TutorService.create(body);
    }
   @Get()
    async findAll(){
        return this.TutorService.findAll();
    }

   @Get(':id')
    async findOne(@Param('id') id:string ){
        return this.TutorService.findOne(id);
    }

}
