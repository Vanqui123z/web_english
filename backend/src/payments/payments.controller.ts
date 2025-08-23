import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/guards/jwt.guards';
import { PaymentsService } from './payments.service';

@Controller('payments')
@UseGuards(JwtGuard)
export class PaymentsController {
    constructor(private payment:PaymentsService){}

    @Post(":id")
    async checkout(@Req() req:any,@Param("id") idTutor:string , @Body() body:{amount: number, packageId: string}){
        console.log("Thanh toán:", req.user.userId,idTutor,body);
        return this.payment.checkout(req.user.userId,idTutor,body)
    }
}
