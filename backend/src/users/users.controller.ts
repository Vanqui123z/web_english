import { Controller, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService : UsersService){}

    @Post("me")
    async me(@Req() req:any){
        const u = await this.userService.findById(req.user.userId)
        const {password,...safe}:any = u;   
        return safe;
    }
}
