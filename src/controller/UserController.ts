import { handleResponses } from '../constants/common_function'
import { Request, Response } from 'express';
import User from "../models/user";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
dotenv.config();

export const resgisterUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const hashedpassword = bcrypt.hashSync(password, 10);

    try {
        const user = await User.findByEmail(email);

        if (user) {
            return handleResponses(res, 'User Already exists', 'Conflict');
        }
        const newUser = new User({
            name,
            email,
            password: hashedpassword
        });

        await newUser.save();
        return handleResponses(res, 'User registered successfully', 'Created', newUser, 'user');
    }
    catch (error: any) {
        return handleResponses(res, error.message, 'Internal_Server_Error')
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const secretKey = process.env.SECRET_KEY || 'default_secret_key';
    try {
        const user = await User.findByEmail(email);

        if (!user) {
            return handleResponses(res, 'User Not Found', 'Not_Found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.get('password'));

        if (!isPasswordValid) {
            return handleResponses(res, 'Password does not match', 'Unauthorized');
        }

        const token = jwt.sign({ id: user.get('id') }, secretKey as string);
        return handleResponses(res, 'Login successful', 'Success', undefined, undefined, token);
    }
    catch (error: any) {
        return handleResponses(res, error.message, 'Internal_Server_Error')

    }
}

