import { Request, Response, NextFunction } from "express";

/**
 * @author: kuldeep
 * @param req: Request Object
 * @param res: Response Object
 * @param role: Role of the user
 * @description: used to check if user role is authorized.
 */
export const checkRole = async(req: Request,res: Response, role: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    //Check if user role is authorized for the api
    if (role == "Admin") resolve(true)
    else reject(false);
  });
};