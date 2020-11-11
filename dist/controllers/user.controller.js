"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const express_1 = __importDefault(require("express"));
const user_service_1 = require("../services/user.service");
const jwt = __importStar(require("jsonwebtoken"));
const checkJwt_1 = require("../middlewares/checkJwt");
const checkRole_1 = require("../middlewares/checkRole");
exports.user = express_1.default.Router();
exports.user.get("/generateJWTToken", generateJWTToken);
exports.user.post("/addUser", addUser);
exports.user.get("/getUsers", [checkJwt_1.checkJwt, roleCheck], getUsers);
exports.user.put("/updateUser", updateUser);
exports.user.delete("/deleteUser", deleteUser);
/**
 *@author: kuldeep
 * @param req: Request Object
 * @param res: Response Object
 * @param next
 * @description: used to generate jwt token
 */
function roleCheck(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        checkRole_1.checkRole(req, res, 'Admin').then(function (response) {
            next();
        }).catch(function (response) {
            res.status(401).send({ message: 'This API is only accessible to admin role only.' });
        });
    });
}
/**
 * @author: kuldeep
 * @param req: Request Object
 * @param res: Response Object
 * @description: used to generate jwt token
 */
function generateJWTToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = {
            firstName: "Kuldeep",
            lastName: "Narvekar",
            userName: "kuldeep",
            password: "kuldeepn123",
            email: "kuldeep@gmail.com"
        };
        const jwtSecret = String(process.env.jwtSecret);
        let jwtToken = jwt.sign(data, jwtSecret, {
            expiresIn: 60 * 60
        });
        res.status(200).send({ message: jwtToken });
    });
}
/**
 * @author: kuldeep
 * @param req: Request Object
 * @param res: Response Object
 * @param next
 * @description: used to add user
 */
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        user_service_1.addUserFunc(req.body)
            .then(function (response) {
            res.status(200).send(response);
        })
            .catch(function (error) {
            res.status(400).send(error);
        });
    });
}
/**
 * @author: kuldeep
 * @param req: Request Object
 * @param res: Response Object
 * @description: used to get all users
 */
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        user_service_1.getUsersFunc()
            .then(function (response) {
            res.status(200).send(response);
        })
            .catch(function (error) {
            res.status(400).send(error);
        });
    });
}
/**
 * @author: kuldeep
 * @param req: Request Object
 * @param res: Response Object
 * @description: used to update user based on username passed in request body.
 */
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        user_service_1.updateUserFunc(req.body)
            .then(function (response) {
            res.status(200).send(response);
        })
            .catch(function (error) {
            res.status(400).send(error);
        });
    });
}
/**
 * @author: kuldeep
 * @param req: Request Object
 * @param res: Response Object
 * @description: used to delete user based on username passed in request body.
 */
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        user_service_1.deleteUserFunc(req.body)
            .then(function (response) {
            res.status(200).send(response);
        })
            .catch(function (error) {
            res.status(400).send(error);
        });
    });
}
