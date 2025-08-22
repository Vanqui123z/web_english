import { Body, Controller, Get, NotFoundException, Param, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/common/guards/role.decorator';

@Controller('users')
@Roles("student")
export class UsersController {

    constructor(private userService: UsersService) { }

    @Post("me")
    async me(@Req() req: any) {
        const u = await this.userService.findById(req.user.userId);
        if (!u) {
            throw new NotFoundException('User not found');
        }
        const { password, ...safe }: any = u;
        return safe;
    }

}
