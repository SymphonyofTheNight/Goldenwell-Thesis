import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
 
import dotenv from 'dotenv';
import OwnerRouter from './routes/Routes.js';

dotenv.config();

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = `mongodb+srv://${process.env.DB_ACCESS_USER}:${process.env.DB_ACCESS_PASSWORD}@goldenwell-e-commerce.rz3fy.mongodb.net/Goldenwell?retryWrites=true&w=majority`;

app.use('/', OwnerRouter);
app.get('/', (req,res) => {
    res.send('APP IS RUNNING');
});

if(CONNECTION_URL){
    mongoose.connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true                                           
    }).then(()=> {
        app.listen(PORT, ()=> {
            console.log(`Server running on port: ${PORT}`);
        })
    }).catch(err => { 
        console.log(err);
    });
}else{
    console.log('CONNECTION URL NOT FOUND');
}

//nxt to do logout from admin home;