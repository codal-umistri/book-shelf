import { Response } from "express";
import { StatusCode } from "../constants/status_utils";

export const handleValidationError = (res: Response, ErrorMessage: string) => {
  return res.status(StatusCode.Bad_Request).json({ message: ErrorMessage });
};

// export const handleResponses = (res: Response, Message: string, status: string, item?: any, itemname?: string, token?: string) => {
//   if (token) {
//     return res.status(StatusCode[status]).json({ message: Message, Token: token })
//   }
//   else if (item && itemname) {
//     return res.status(StatusCode[status]).json({ message: Message, itemname: item.toJSON() })
//   } else {
//     return res.status(StatusCode[status]).json({ message: Message })
//   }
// };

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