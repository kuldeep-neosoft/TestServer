import express, {Request, Response, NextFunction} from 'express';
import { addUserFunc, getUsersFunc, updateUserFunc, deleteUserFunc } from '../services/user.service'
import * as jwt from 'jsonwebtoken';
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
export const user = express.Router();
user.get("/generateJWTToken", generateJWTToken);
user.post("/addUser", addUser);
user.get("/getUsers", [checkJwt, roleCheck], getUsers);
user.put("/updateUser", updateUser);
user.delete("/deleteUser", deleteUser);

/**
 *@author: kuldeep
 * @param req: Request Object
 * @param res: Response Object
 * @param next
 * @description: used to check if user role is authorized.
 */
async function roleCheck (req: Request, res: Response, next: NextFunction) {
  checkRole(req, res, 'Admin').then(function(response) {
    next();
  }).catch(function(response) {
    res.status(401).send({message: 'This API is only accessible to admin role only.'});
  })
}

/**
 * @author: kuldeep
 * @param req: Request Object
 * @param res: Response Object
 * @description: used to generate jwt token.
 */
async function generateJWTToken (req: Request, res: Response) {
  let data = {
    firstName: "Kuldeep",
    lastName: "Narvekar",
    userName: "kuldeep",
    password: "kuldeepn123",
    email: "kuldeep@gmail.com"
}
const jwtSecret = String(process.env.jwtSecret);
  let jwtToken = jwt.sign(data, jwtSecret, {
      expiresIn: 60 * 60
    });
  res.status(200).send({message: jwtToken});
}

/**
 * @author: kuldeep
 * @param req: Request Object
 * @param res: Response Object
 * @param next
 * @description: used to add user.
 */
async function addUser (req: Request, res: Response) {
    addUserFunc(req.body)
  .then(function (response) {
    res.status(200).send(response);
  })
  .catch(function(error){
    res.status(400).send(error);
  });
}

/**
 * @author: kuldeep
 * @param req: Request Object
 * @param res: Response Object
 * @description: used to get all users.
 */
async function getUsers (req: Request, res: Response) {
  getUsersFunc()
  .then(function (response) {
    res.status(200).send(response);
  })
   .catch(function(error){
    res.status(400).send(error);
  });
}

/**
 * @author: kuldeep
 * @param req: Request Object
 * @param res: Response Object
 * @description: used to update user based on username passed in request body.
 */
async function updateUser (req: Request, res: Response) {
   updateUserFunc(req.body)
  .then(function (response) {
    res.status(200).send(response);
  })
   .catch(function(error){
    res.status(400).send(error);
  });
}

/**
 * @author: kuldeep
 * @param req: Request Object
 * @param res: Response Object
 * @description: used to delete user based on username passed in request body.
 */
async function deleteUser (req: Request, res: Response) {
     deleteUserFunc(req.body)
  .then(function (response) {
    res.status(200).send(response);
  })
   .catch(function(error){
    res.status(400).send(error);
  });
}