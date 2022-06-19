import OwnerModels from '../models/OwnerModels.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const ownersignup = async (req,res) => {

    const { username,password } = req.body;

    try {
        const isExistingAccount = await OwnerModels.findOne({ username });

        if(isExistingAccount || [isExistingAccount].includes(username)) return res.status(404).json({ message: 'User Already Exist' });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await OwnerModels.create(
            { username, password: hashedPassword }
            );

        const token = await jwt.sign(
            { username: result.username, id: result._id },
            process.env.OWNER_AUTH_SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({ result, token });
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: 'ERROR' });
    }

}

export const ownersignin = async (req,res) => {
    
    const { username,password } = req.body;

    try {
        const isExistingAccount = await OwnerModels.findOne({ username });

        if(!isExistingAccount) return res.status(404).json({ message: 'User does not exist' });

        const isPasswordCorrect = await bcrypt.compare(password, isExistingAccount.password);

        if(!isPasswordCorrect) return res.status(404).json({ message: 'Invalid Credentials' });

        const token = await jwt.sign(
            { username: isExistingAccount.username, id: isExistingAccount._id },
            process.env.OWNER_AUTH_SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({ result: isExistingAccount, token });

    } catch (error) {
        console.error(err);
        res.status(404).json({ message: 'ERROR' });
    }

}

export const EditOwnerUsername = async (req,res) => {

    const { id } = req.params;

    console.log(id);
    console.log(req.body);

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return req.status(404).json({ message: 'invalid ID' });

        await OwnerModels.findByIdAndUpdate(id,
        {
            $set: {
                username: req.body.username
            }
        },
        {
            new: true
        });


    } catch (error) {
        res.status(404).json(error);
    }
} 

export const EditOwnerPassword = async (req,res) => {

    const { id } = req.params;
    const { password } = req.body;

    console.log(id);
    console.log(req.body);

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return req.status(404).json({ message: 'invalid ID' });

        const Pass = await bcrypt.hash(password,12);

        await OwnerModels.findOneAndUpdate(id,
        {
            $set: {
                password: Pass
            }
        },
        {
            new: true
        });

    } catch (error) {
        res.status(404).json(error);
    }
} 

