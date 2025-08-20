import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://levanquy1923:Quyden123z@cluster0.nynvo9n.mongodb.net/web_english?retryWrites=true&w=majority&appName=Cluster0" ),
    AuthModule,UsersModule],
  controllers: [AuthController],
  providers: [ AuthService],

})
export class AppModule {}
