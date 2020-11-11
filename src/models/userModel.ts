import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UsersSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    userName: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String            
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});