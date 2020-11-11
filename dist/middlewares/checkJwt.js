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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const jwt = __importStar(require("jsonwebtoken"));
/**
 * @author: kuldeep
 * @param req: Request Object
 * @param res: Response Object
 * @param next
 * @description: used to authenticate jwt token.
 */
exports.checkJwt = (req, res, next) => {
    //Get the jwt token from the head
    const token = req.headers["authorization"];
    let jwtPayload;
    const jwtSecret = String(process.env.jwtSecret);
    //Try to validate the token and get data
    try {
        jwtPayload = jwt.verify(token, jwtSecret);
        // console.log("jwtPayload: ",jwtPayload);
        next();
    }
    catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        res.status(401).send(error);
        return;
    }
};
