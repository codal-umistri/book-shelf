import { Request } from "express"; 
export interface CustomRequest extends Request {
    userid?: string; 
}

export interface StatusCodeMap {
    [message: string]: number;
}