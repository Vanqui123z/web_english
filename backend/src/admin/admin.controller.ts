import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/guards/jwt.guards';
import { Roles } from 'src/common/guards/role.grards';
import { RolesGuard } from 'src/common/guards/role.guarrds';
import { TutorsService } from 'src/tutors/tutors.service';
import { UsersService } from 'src/users/users.service';

@Controller('admin')
@UseGuards(JwtGuard,RolesGuard)
@Roles("admin")
export class AdminController {
    constructor(private user:UsersService,private tutor:TutorsService){}

    @Get("users")
    ListUsers(){
        return this.user.getAll();
    }
    @Patch("users/:id/status")
    updateUsers(@Param("id") id:string, @Body("status") status: "block"|"active"){
        return this.user.updateById(id,{status})
    }
    @Delete("users/:id")
    deleteUser(@Param("id") id:string){
        return this.user.deleteById(id);
    }
    @Get("tutors")
    ListTutor(){
        return this.tutor.findAll()
    }
    @Patch("tutors/:id")
    updateTutor(@Param("id") id:string, @Body() body:any){
        return this.tutor.updateById(id,body);
    }




}
