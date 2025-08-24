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
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { SeoController } from './utils/seo.controller';

const MONGO_URI = process.env.MONGO_URI || "";
console.log(MONGO_URI)
@Module({
  imports: [

    //conncect database monggodb
   ConfigModule.forRoot({
      isGlobal: true, // để dùng được ở mọi nơi
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        connectTimeoutMS: 30000,
      }),
    }), 
    //chống brute-force, spam request
    ThrottlerModule.forRoot([
      {
        ttl: 60, // 60 giây
        limit: 10, // tối đa 10 request / IP / 60s
      },
    ]),
    

    AuthModule, UsersModule, TutorModule, BookingModule, PaymentsModule,AdminModule],
  controllers: [SeoController,AuthController],
  providers: [AuthService,
    { provide: APP_GUARD, useClass: JwtGuard },
    { provide: APP_GUARD, useClass: RolesGuard }],

})
export class AppModule { }
