import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tutor, TutorDocument } from './schemas/tutor.schema';
import { Model } from 'mongoose';

@Injectable()
export class TutorsService {

    constructor(@InjectModel(Tutor.name) private TutorModal:Model<TutorDocument>){}

    async create(data:Partial<Tutor> ): Promise<Tutor>{
        return this.TutorModal.create(data);
    }
    async findAll(){
        return this.TutorModal.find().exec();
    }
    async findOne(id:string):Promise<Tutor|null>{
        return this.TutorModal.findById(id).exec()
    }
    async findByUserId(userId: string):Promise<Tutor | null>{
        return this.TutorModal.findById(userId).exec()

    }
}
