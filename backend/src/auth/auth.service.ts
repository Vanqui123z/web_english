import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import  bcrypt from 'bcrypt';
import  jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'default JWT_SECRET';


@Injectable()
export class AuthService {
    constructor(private userService:UsersService){}

    async register(name:string,password:string,email:string,role:string ="student"){
        const hashed = await bcrypt.hash(password,10);
        return this.userService.create({name,password:hashed ,email,role})
    }
    async login(email:string,password:string){
        const user = await this.userService.findByEmail(email);
        if(!user) throw new UnauthorizedException("user not found");
        const match = bcrypt.compare(password,user.password);
        if(!match) throw new UnauthorizedException("pass not match");

        const token = jwt.sign({userId:user._id,role:user.role},JWT_SECRET,{expiresIn:"4h"});
        
        return {token, role:user.role, name:user.name,status:user.status}
        
    }
    
}
