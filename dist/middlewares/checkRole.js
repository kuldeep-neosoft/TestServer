"use strict";
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
exports.checkRole = void 0;
/**
 * @author: kuldeep
 * @param req: Request Object
 * @param res: Response Object
 * @param role: Role of the user
 * @description: used to check if user role is authorized.
 */
exports.checkRole = (req, res, role) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("roles:", role);
    return new Promise((resolve, reject) => {
        //Check if user role is authorized for the api
        if (role == "Admin")
            resolve(true);
        else
            reject(false);
    });
});
