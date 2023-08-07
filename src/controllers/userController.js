import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import UserModel from '../models/User.js'

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash =  await bcrypt.hash(password, salt)
        const doc = new UserModel({
            fullName: req.body.fullName,
            email: req.body.email,
            description: req.body.description,
            passwordHash: hash
        })
        const user = await doc.save()
        const token = jwt.sign(
            {
                _id: user._id
            }, 
            'jack-black',
            {
                expiresIn: '1d'
            }
        )
        const { passwordHash, ...userData } = user._doc

        res.json({ ...userData, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Registration error'
        })
    }
}
export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })

        if (!user) {
            return res.status(400).json({
                message: 'Wrong login or password'
            });
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if (!isValidPassword) {
            return res.status(400).json({
                message: 'Wrong login or password'
            });
        }

        const token = jwt.sign(
            {
                _id: user._id
            },
            'jack-black',
            {
                expiresIn: '1d'
            }
        );
        const { passwordHash, ...userData } = user._doc

        res.json({ ...userData, token })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Login error'
        })
    }
}