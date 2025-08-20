import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel:Model<UserDocument>){}
    async create(user:Partial<User>):Promise<User>{
        return this.userModel.create(user);
    }
    async findById(email:string):Promise<User | null>{
        return  this.userModel.findOne({email}).exec();
    }
}
