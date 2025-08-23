import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TutorModule } from './tutors/tutors.module';
import { PaymentsModule } from './payments/payments.module';
import { BookingModule } from './booking/booking.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtGuard } from './common/guards/jwt.guards';
import { RolesGuard } from './common/guards/role.guard';
import { AdminModule } from './admin/admin.module';

const MONGO_URI = process.env.MONGO_URI || "";
console.log(MONGO_URI)
@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://levanquy1923:Quyden123z@cluster0.nynvo9n.mongodb.net/web_english?retryWrites=true&w=majority&appName=Cluster0", {
  serverSelectionTimeoutMS: 30000, // tăng timeout chọn server
  socketTimeoutMS: 45000,          // tăng timeout query
  connectTimeoutMS: 30000,         // tăng timeout mở kết nối
}),

    AuthModule, UsersModule, TutorModule, BookingModule, PaymentsModule,AdminModule],
  controllers: [AuthController],
  providers: [AuthService,
    { provide: APP_GUARD, useClass: JwtGuard },
    { provide: APP_GUARD, useClass: RolesGuard }],

})
export class AppModule { }
