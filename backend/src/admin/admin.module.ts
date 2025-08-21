import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UsersModule } from 'src/users/users.module';
import { TutorModule } from 'src/tutors/tutors.module';

@Module({
  imports:[UsersModule, TutorModule],
  controllers: [AdminController],
})
export class AdminModule {}
