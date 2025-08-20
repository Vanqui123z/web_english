import { Module } from '@nestjs/common';
import { TutorsService } from './tutors.service';
import { TutorsController } from './tutors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tutor, TutorSchema } from './schemas/tutor.schema';

@Module({
    imports:[MongooseModule.forFeature([{name: Tutor.name, schema: TutorSchema}])],
  providers: [TutorsService],
  controllers:[TutorsController],
})
export class TutorModule {}
