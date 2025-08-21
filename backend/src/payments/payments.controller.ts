import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/guards/jwt.guards';
import { PaymentsService } from './payments.service';

@Controller('payments')
@UseGuards(JwtGuard)
export class PaymentsController {
    constructor(private payment:PaymentsService){}

    @Post("payment")
    async checkout(@Req() req:any, @Body() body:{amount: number, packageId: string, tutorId?: string}){
        return this.payment.checkout(req.user.userId,body)
    }
}
