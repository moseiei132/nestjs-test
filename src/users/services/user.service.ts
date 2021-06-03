import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../repositories/user.repository";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserRepository)
        private userRepo: UserRepository
    ){}

    getAllUser(){
        return this.userRepo.find();
    }
    

    getUserInfo(id:number){
        return this.userRepo.findOne(id);
    }

    findByUsername(username: string){
        return this.userRepo.findOne({username: username});
    }
}
