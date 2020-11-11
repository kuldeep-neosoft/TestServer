'use strict';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UsersSchema } from '../models/userModel';


const User = mongoose.model('User', UsersSchema);

export const addUserFunc = async (body: any): Promise<any> => { 
    return new Promise((resolve, reject) => {
      body.password = bcrypt.hashSync(body.password, 10);
    let newUser = new User(body);
        newUser.save((err, data) => {
            if(err){
                reject(err);
            }    
            let response = {message: "add operation successful"}
            resolve(response);
        });
    })
}

export const getUsersFunc = async (): Promise<any> => { 
    return new Promise((resolve, reject) => {
      User.find({}, (err, response) => {
            if(err){
                reject(err);
            }
            resolve(response);
        });
    })
}

export const updateUserFunc = async (body: any): Promise<any> => { 
    return new Promise((resolve, reject) => {
      let newUser = new User(body);
      User.findOneAndUpdate({ userName: body.userName }, body, { new: true }, (err, data) => {
            if(err){
                reject(err);
            }
           let response = {message: "update operation successful"}
          resolve(response);
        });
    })
}

export const deleteUserFunc = async (body: any): Promise<any> => { 
    return new Promise((resolve, reject) => {
      User.deleteOne({ userName: body.userName }, (err) => {
            if(err){
                 reject(err);
            }
             let response = {message: "delete operation successful"}
             resolve(response);
        });
    })
}