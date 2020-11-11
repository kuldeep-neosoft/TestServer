import express, {Application, Request, Response, NextFunction} from 'express';
import { user } from './controllers/user.controller';
export const routes = express.Router();

//root routes
routes.use("/user", user);