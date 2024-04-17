import {StatusCodeMap} from '../type/types';
import { Response } from 'express';

const StatusCode: StatusCodeMap = {
  'Success': 200,
  'Created': 201,
  'Conflict': 409,
  'Not_Found': 404,
  'Internal_Server_Error': 500,
  'Unauthorized':401,
  'Forbidden':403,
  'Bad_Request' :400 
};

export const handleValidationError = (res: Response, ErrorMessage: string) => {
  return res.status(StatusCode.Bad_Request).json({ message: ErrorMessage });
};
  
export const handleResponses = (
  res: Response,
  message: string,
  status: string,
  item?: any,
  itemname: string = 'item',
  token?: string,
) => {
  const responseObj: { message: string, Token?: string, [key: string]: any } = { message };
  
  if (token) {
    responseObj.Token = token;
  } else if (item !== undefined) {
    responseObj[itemname] = item.toJSON ? item.toJSON() : item;
  }
  
  return res.status(StatusCode[status]).json(responseObj);
};