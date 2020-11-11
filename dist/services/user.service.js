'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserFunc = exports.updateUserFunc = exports.getUsersFunc = exports.addUserFunc = void 0;
const mongoose = __importStar(require("mongoose"));
const bcrypt = __importStar(require("bcrypt"));
const userModel_1 = require("../models/userModel");
const User = mongoose.model('User', userModel_1.UsersSchema);
exports.addUserFunc = (body) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        body.password = bcrypt.hashSync(body.password, 10);
        let newUser = new User(body);
        newUser.save((err, data) => {
            if (err) {
                reject(err);
            }
            let response = { message: "add operation successful" };
            resolve(response);
        });
    });
});
exports.getUsersFunc = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        User.find({}, (err, response) => {
            if (err) {
                reject(err);
            }
            resolve(response);
        });
    });
});
exports.updateUserFunc = (body) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        let newUser = new User(body);
        User.findOneAndUpdate({ userName: body.userName }, body, { new: true }, (err, data) => {
            if (err) {
                reject(err);
            }
            let response = { message: "update operation successful" };
            resolve(response);
        });
    });
});
exports.deleteUserFunc = (body) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        User.deleteOne({ userName: body.userName }, (err) => {
            if (err) {
                reject(err);
            }
            let response = { message: "delete operation successful" };
            resolve(response);
        });
    });
});
