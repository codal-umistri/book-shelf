import User from "../models/user";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export const ResgisterUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const hashedpassword = bcrypt.hashSync(password, 10);
    let newUser;
    try {
        const user = await User.findByEmail(email);
        return user ?
            res.status(201).json({ message: 'User Already exists' })
            : (
                newUser = await User.forge<User>({
                    name,
                    email,
                    password: hashedpassword
                }).save(),

                res.status(201).json({ message: 'User registered successfully', user: newUser.toJSON() }))
    }
    catch (error: any) {
        return res.status(500).json({ message: error.message });
    }

}


export const LoginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const secretKey = process.env.SECRET_KEY || 'default_secret_key';
    try {
        const user = await User.findByEmail(email);

        return !user ? res.status(201).json({ message: 'User Not Found' }) :
            (
                await bcrypt.compare(password, user?.get('password'))
                    ? res.status(201).json({ message: 'Login sucessfull', TOKEN: jwt.sign({ id: user?.get('id') }, secretKey as string), })
                    : res.status(201).json({ message: 'password doesnt match' })
            )

    }
    catch (error: any) {
        return res.status(500).json({ message: error.message });
    }

}
