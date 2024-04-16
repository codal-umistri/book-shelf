import { handleResponses } from '../constants/common_function';
import { Response, NextFunction } from 'express';
import { CustomRequest } from '../type/types';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const Auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const secretKey = process.env.SECRET_KEY || 'default_secret_key';
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return handleResponses(res, 'Unauthorized User', 'Unauthorized');
    }

    const decodedToken = jwt.verify(token, secretKey as string) as { id: string };
    req.userid = decodedToken.id;
    next();
  } catch (error: any) {
    return handleResponses(res, 'Unauthorized User', 'Unauthorized');
  }
};