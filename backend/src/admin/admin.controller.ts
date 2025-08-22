import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, UseGuards } from '@nestjs/common';
import { TutorsService } from 'src/tutors/tutors.service';
import { UsersService } from 'src/users/users.service';

@Controller('admin')
export class AdminController {
    constructor(private user: UsersService, private tutor: TutorsService) { }

    @Get("users")
    ListUsers() {
        return this.user.getAll();
    }
     @Get("users/:id")
    async getUser(@Param("id") id: string) {
        return  await this.user.findById(id);
    }
    @Patch("users/:id/status")
    updateUsers(@Param("id") id: string, @Body("status") status: "blocked" | "active") {
        console.log(id)
        return this.user.updateById(id, { status })
    }
    @Delete("users/:id")
    deleteUser(@Param("id") id: string) {
        return this.user.deleteById(id);
    }
    @Get("courses")
    ListTutor() {
        return this.tutor.findAll()
    }
    @Patch("courses/:id")
    updateTutor(@Param("id") id: string, @Body("body") body: any) {
        return this.tutor.updateById(id, body);
    }

   




}
