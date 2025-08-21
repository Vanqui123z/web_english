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
    async getAll(){
        return this.userModel.find().select("-password");
    }
    async updateById(id:string,data: Partial<User>){
        return this.userModel.findByIdAndUpdate(id, data,{new : true}).select("-password");
    }
    async findByEmail(email:string):Promise<User | null>{
        return  this.userModel.findOne({email}).exec();
    }
    async findById(id:string):Promise<User | null>{
        return  this.userModel.findById(id).select("-password").lean()
    }
    async deleteById(id:string){
        return this.userModel.findByIdAndDelete(id);
    }
}
