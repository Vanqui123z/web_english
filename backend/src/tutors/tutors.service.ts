import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tutor, TutorDocument } from './schemas/tutor.schema';
import { Model } from 'mongoose';

@Injectable()
export class TutorsService {

    constructor(@InjectModel(Tutor.name) private TutorModal: Model<TutorDocument>) { }

    async create(data: Partial<Tutor>): Promise<Tutor> {
        return this.TutorModal.create(data);
    }
    async findAll() {
        return this.TutorModal.find()
            .populate("userId", "name email")
            .exec();
    }
    async findAllCourses() {
        return this.TutorModal.find()
    }
    async updateById(id: string, data: Partial<Tutor>) {
        return this.TutorModal.findByIdAndUpdate(id, data, { new: true });
    }

    async findOne(id: string): Promise<Tutor | null> {
        return this.TutorModal.findById(id).populate("userId", "name email")
            .exec();
    }
    async findByTutorId(userId: string): Promise<Tutor | null> {
        return this.TutorModal.findOne({ userId }).exec();
    }
    async findAllTutorByUser(userId: string): Promise<Tutor[]> {
        return this.TutorModal.find({ userId }).exec();
    }

    async findByUserId(userId: string): Promise<Tutor | null> {
        return this.TutorModal.findOne({ userId }).populate("userId", "name email").exec();
    }
}
