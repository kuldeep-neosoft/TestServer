"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./controllers/user.controller");
exports.routes = express_1.default.Router();
//root routes
exports.routes.use("/user", user_controller_1.user);
