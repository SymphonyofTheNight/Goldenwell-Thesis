import OwnerModels from "../models/OwnerModels.js";
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import moment from 'moment';
import { google } from 'googleapis';

dotenv.config();

export const getOwnerProducts = async (req,res) => {
    try {
        const OwnerProducts = await OwnerModels.find({});
        res.status(200).json(OwnerProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const addOwnerProducts = async (req,res) => {
    const { 
        id,
    } = req.params;

    console.log(id, 'add');

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'ID not found' });

        const addedProduct = await OwnerModels.findByIdAndUpdate(
            id || req.params.id,
            {
                $push: {
                    store: { 
                        product_identifier: req.body.store[0].product_identifier,
                        productname: req.body.store[0].productname,
                        price: req.body.store[0].price,
                        quantity: req.body.store[0].quantity,
                        categoryfilter: req.body.store[0].categoryfilter,
                        description: req.body.store[0].description,
                        specs: req.body.store[0].specs,
                        imageBase64: req.body.store[0].imageBase64,
                        timestamp: req.body.store[0].timestamp,
                    }
                }
            },
            { new: true }
        );

        res.json(addedProduct);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const updateProduct = async (req,res) => {

    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'Invalid ID' });

        await OwnerModels.findOneAndUpdate(
            { 'id': id || req.params },
            {
                $set: {
                    "store.$[s].product_identifier": req.body.store[0].product_identifier,
                    "store.$[s].productname": req.body.store[0].productname,
                    "store.$[s].price": req.body.store[0].price,
                    "store.$[s].quantity": req.body.store[0].quantity,
                    "store.$[s].categoryfilter": req.body.store[0].categoryfilter,
                    "store.$[s].description": req.body.store[0].description,
                    "store.$[s].specs": req.body.store[0].specs,
                    "store.$[s].imageBase64": req.body.store[0].imageBase64,
                    "store.$[s].timestamp": req.body.store[0].timestamp
                }
            },
            {
                arrayFilters: [
                    {
                        "s.product_identifier": req.body.store[0].product_identifier
                    }
                ],
                returnDocument: 'after', 
                safe: true, 
            }, (error, response) => {
                if(error){
                    console.log(error)
                }else{
                    console.log('successful edit!');
                }
            }
        );

    } catch (error) {
        res.status(404).json(error)
    }


}

export const deleteProduct = async (req,res) => {

    const {
        id,
    } = req.params;

    // console.log(id);
    console.log(req.body.store[0]._id);

    try {
        if(!id) return res.status(404).json({ message: 'ID not found' });

        await OwnerModels.findOneAndUpdate(
            id,
            {
                $pull: {
                    store: {
                        _id: req.body.store[0]._id
                    }
                }
            },
            { new: true }
        )
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const toDeliver = async (req,res) => {
    
    const { id } = req.params;

    console.log(id);
    console.log(req.body);

    let i;
  
    try {
        if(!id) return res.status(404).json({ message: 'ID not found' });

        for(i = 0; i < req.body.delivery.length; i++){
            await OwnerModels.findByIdAndUpdate(
                id,
                {

                    $inc: {
                        totalSales: req.body.delivery[i].price,
                        totalOrders: 1
                    },

                    $addToSet: {
                        delivery: {
                            $each: [
                                {
                                    productname: req.body.delivery[i].productname,
                                    product_identifier: req.body.delivery[i].product_identifier,
                                    price: req.body.delivery[i].price,
                                    imageBase64: req.body.delivery[i].imageBase64,
                                    quantity: req.body.delivery[i].quantity,
                                    clientID: req.body.delivery[i].clientID,
                                    clientname: req.body.delivery[i].clientname,
                                    address: req.body.delivery[i].address,
                                    email: req.body.delivery[i].email,
                                    number: req.body.delivery[i].number
                                }
                            ]
                        }
                    }
                },
                { new: true, upsert: true }
            )
        }

        // var customerName = req.body.delivery[0].clientname;

        for(i = 0; i < req.body.delivery.length; i++){

            console.log('email sent');

            console.log(req.body.delivery[i].email);

            const OAuth2 = google.auth.OAuth2;
            const OAuth2_Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
            OAuth2_Client.setCredentials({ refresh_token: process.env.CLIENT_TOKEN })

            const accessToken = OAuth2_Client.getAccessToken()

            let transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: process.env.GMAIL_USER,
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    refreshToken: process.env.CLIENT_TOKEN,
                    accessToken: accessToken
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            let mailOptions = {
                from: 'goldenwell2015@gmail.com',
                to: req.body.delivery[i].email,
                subject: 'Order Being Processed' + ' ' + '#' + req.body.delivery[i]._id,
                html: `
                    <h1>Thanks for shopping with us!</h1>
                    <h3>Hi! ${req.body.delivery[i].clientname}</h3>
                    <p>
                        We receive your order number #${req.body.delivery[i]._id} on ${moment().format('MMMM Do YYYY, h:mm:ss a')}
                        and you'll be paying for this via COD. <br/> We're getting your order ready and will let you know once it's on the way. 
                        We wish you enjoy shopping with us and hope to see you again real soon!
                    </p>
                    <h1>Delivery Details</h1>
                    <p><strong>Name:</strong> ${req.body.delivery[i].clientname}</p>
                    <p><strong>Address:</strong> ${req.body.delivery[i].address}</p>
                    <p><strong>Phone:</strong> ${req.body.delivery[i].number}</p>
                    <p><strong>Email:</strong> ${req.body.delivery[i].email}</p>
                    <h1>PACKAGE</h1>
                    <strong>Sold by: Goldenwell</strong>
                    <h3>${req.body.delivery[i].productname}</h3>
                    <h3>${req.body.delivery[i].price}</h3>
                    <br/>
                    <p>Paid by: <strong>COD</strong></p>
                `, 
            };
    
            transport.sendMail(mailOptions, (err,data) => {
                if(err) {
                    console.log('Error occurs', err);
                } else {
                    console.log(data);
                }
            })
        }
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const pullApproveItem = async (req,res) => {

    const { id } = req.params;

    console.log(id);
    console.log(req.body);

    try {
        if(!id) return res.status(404).json({ message: 'ID not found' });

        await OwnerModels.findByIdAndUpdate(id, {
            $pull: {
                delivery: {
                    _id: req.body.delivery[0]._id
                }
            }
        },{
            new: true
        })
    } catch (error) {
        req.status(404).json(error);
    }
}

// export const delivery = async (req,res) => {

//     const { id } = req.params;

//     console.log(id);
//     console.log(req.body.delivery[0]);

//     try {
//         if(!id) return res.status(404).json({ message: 'ID not found' });
//         await OwnerModels.findByIdAndUpdate(id,
//             {
//                 $push: {
//                     delivery: 
//                     {
//                         clientname: req.body.delivery[0].clientname,
//                         address: req.body.delivery[0].address,
//                         email: req.body.delivery[0].email,
//                         number: req.body.delivery[0].number,
//                         // toDeliver:
//                         //     [{
//                         //         product_identifier: req.body.delivery[0].toDeliver.product_identifier,
//                         //         productname: req.body.delivery[0].toDeliver.productname,
//                         //         price: req.body.delivery[0].toDeliver.price
//                         //     }]
//                         // ,
//                         // toDeliverPaidViaPaypal: []
//                     }
//                 }
//             },
//             {
//                 new: true
//             },(err,res)=> {
//                 if(err) return console.log({ error: err });
//                 console.log({  result: res });
//             }).clone();
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// }

                    // "delivery.$.clientname": req.body.delivery[0].clientname,
                    // "delivery.$.address": req.body.delivery[0].address,
                    // "delivery.$.email": req.body.delivery[0].email,
                    // "delivery.$.number": req.body.delivery[0].number,
                    // "delivery.$.toDeliver[0].product_identifier":  req.body.delivery[0].toDeliver.product_identifier,
                    // "delivery.$.toDeliver[0].productname": req.body.delivery[0].toDeliver.productname,
                    // "delivery.$.toDeliver[0].price": req.body.delivery[0].toDeliver.price

                    // /customer need to be save on database on admin para d na gumawa bagong id at client.
                    
