import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

/**
 * @author: kuldeep
 * @param req: Request Object
 * @param res: Response Object
 * @param next
 * @description: used to authenticate jwt token.
 */
export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const token = <string>req.headers["authorization"];
  let jwtPayload;
  const jwtSecret = String(process.env.jwtSecret);
  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, jwtSecret);
    // console.log("jwtPayload: ",jwtPayload);
     next();
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    res.status(401).send(error);
    return;
  }
};