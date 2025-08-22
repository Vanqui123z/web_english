import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/guards/role.decorator';

@Controller('auth')
@Public()
export class AuthController {
    constructor(private authService:AuthService){}
    @Post('register')
    async register(
        @Body('name') name:string,
        @Body('password') password:string,
        @Body('email') email:string,
        @Body('role') role:string,
    ){
        return this.authService.register(name,password,email,role);
    }
    @Post('login')
    async login(
        @Body('email') email :string,
        @Body('password') password :string,

    ){
        return this.authService.login(email,password)
    }

}
