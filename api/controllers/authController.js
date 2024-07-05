import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        
        next(errorHandler(400, 'All fields are required'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({ 
        username, 
        email, 
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.json({ message: 'User created successfully' });
    } catch (error) {
        next(error);
    }

}

export const signin = async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
    }

    try {
        const validUser = await User.findOne ({ email });
        if (!validUser) {
           return next(errorHandler(400, 'Invalid credentials'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            next(errorHandler(400, 'Invalid credentials'));
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const { password: userPassword, ...user } = validUser._doc;
        res.status(200).cookie('access_token', token, { httpOnly: true }).json
        (validUser);

    } catch (error) {
        next(error);
    }
}