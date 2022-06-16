import ClientModels from '../models/ClientModels.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const clientsignup = async (req,res) => {

    const { fullname,address,email,google_id,birthday,number,gender,username,password } = req.body;

    console.log(req.body);

    if(fullname && address && email && birthday && number && username && password) {
        try {
            const isExistingAccount = await ClientModels.findOne({ username });
    
            if(isExistingAccount || [isExistingAccount].includes(username)) return res.status(404).json({ message: 'User Already Exist' });
    
            const hashedPassword = await bcrypt.hash(password, 12);

            const result = await ClientModels.create(
            { fullname, address, email, google_id,birthday, 
                number, gender, username, password: hashedPassword });
            const token = await jwt.sign(
            { username: result.username, id: result._id },
                process.env.OWNER_AUTH_SECRET_KEY,
            { expiresIn: '1h' });
            res.json({ result, token });

            // if(google_id === null || undefined){
            //     const result = await ClientModels.create(
            //         { fullname, address, email, birthday, 
            //             number, gender, username, password: hashedPassword }
            //         );
            //     const token = await jwt.sign(
            //         { username: result.username, id: result._id },
            //         process.env.OWNER_AUTH_SECRET_KEY,
            //         { expiresIn: '1h' }
            //     );
            //     res.json({ result, token });
            // }

        } catch (err) {
            console.error(err);
            res.status(404).json({ message: 'ERROR' });
        }
    }  

}

export const clientsignin = async (req,res) => {
    
    const { username,password } = req.body;

    try {
        const isExistingAccount = await ClientModels.findOne({ username });

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
