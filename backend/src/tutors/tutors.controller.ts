import { Body, Controller, Get, NotFoundException, Param, Post, Req } from '@nestjs/common';
import { TutorsService } from './tutors.service';
import { Roles } from 'src/common/guards/role.decorator';
import getUserId from 'src/utils/user.decorator';

@Controller('tutors')
export class TutorsController {
    constructor(private TutorService: TutorsService) { }
    @Roles("tutor")
    @Post("create")
    async create(@Req() req: any, @Body() body: any) {
        const userId = getUserId(req);
        return this.TutorService.create({ userId, ...body });
    }
    @Roles("tutor")
   @Post("/:id/update")
   async updateTutor(@Param('id') id: string, @Body() body: any) {
       return this.TutorService.updateById(id, body);
   }

    @Roles("tutor")
    @Get("me")
    async getMyProfile(@Req() req: any) {
        const userId = getUserId(req);
        return this.TutorService.findByUserId(userId);
    }

    @Roles("tutor")
   @Get("update")
   async update(@Req() req: any, @Body() body: any) {
       const userId = getUserId(req);
       return this.TutorService.updateById(userId, body);
   }
   
    @Roles("student")
    @Get()
    async findAll() {
        return this.TutorService.findAll();
    }


    @Roles("student","tutor")
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.TutorService.findOne(id);
    }

}
