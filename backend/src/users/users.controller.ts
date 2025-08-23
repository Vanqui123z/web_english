import { Body, Controller, Get, NotFoundException, Param, Post, Put, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/common/guards/role.decorator';

@Controller('users')
@Roles("student", "tutor")
export class UsersController {

    constructor(private userService: UsersService) { }
    @Get("profile")
    async user(@Req() req: any) {
        const u = await this.userService.findById(req.user.userId);
        if (!u) {
            throw new NotFoundException('User not found');
        }
        const { password, ...safe }: any = u;
        return safe;
    }
    @Put("update")
    async update(@Req() req: any, @Body() updateData: any) {
        const updatedUser = await this.userService.updateById(req.user.userId, updateData);
        if (!updatedUser) {
            throw new NotFoundException('User not found');
        }
        return updatedUser;
    }

}
