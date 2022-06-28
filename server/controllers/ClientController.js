import mongoose from 'mongoose';
import ClientModels from "../models/ClientModels.js";

export const getClientProducts = async (req,res) => {
    try {
        const ClientProducts = await ClientModels.find({});
        res.status(200).json(ClientProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const AddProdToCard = async (req,res) => {

    const { id } = req.params;

    // console.log(id);
    // console.log(req.body);

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'invalid credential' });

        const addedProd = await ClientModels.findByIdAndUpdate(id,{
            $push: {
                cart: {
                    productname: req.body.cart[0].productname,
                    product_identifier: req.body.cart[0].product_identifier,
                    price: req.body.cart[0].price,
                    imageBase64: req.body.cart[0].imageBase64,
                    quantity: req.body.cart[0].quantity,
                    clientID: req.body.cart[0].clientID,
                    clientname: req.body.cart[0].clientname,
                    address: req.body.cart[0].address,
                    email: req.body.cart[0].email,
                    number: req.body.cart[0].number
                }
            }
        },{
            new: true, upsert: true
        })

        res.json(addedProd);

    } catch (error) {
        res.status(404).json(error);
    }

}

export const Addtowishlist = async (req,res) => {

    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'invalid credential' });

        const wishlistadded = await ClientModels.findByIdAndUpdate(id, {
            $push: {
                wishlist: {
                    productname: req.body.wishlist[0].productname,
                    product_identifier: req.body.wishlist[0].product_identifier,
                    price: req.body.wishlist[0].price,
                    imageBase64: req.body.wishlist[0].imageBase64,
                    quantity: req.body.wishlist[0].quantity,
                    clientID: req.body.wishlist[0].clientID,
                    clientname: req.body.wishlist[0].clientname,
                    address: req.body.wishlist[0].address,
                    email: req.body.wishlist[0].email,
                    number: req.body.wishlist[0].number
                }
            }
        },
        {
            new: true
        })

        res.json(wishlistadded);

    } catch (error) {
        res.status(404).json(error);
    }
}

export const tobeDeliver = async (req,res) => {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'ID not found' });

        const addedtoveliveries = await ClientModels.findByIdAndUpdate(
            id || req.params.id,
            {
                $push: {
                    toBeDeliver: { 
                        item_identification_number: req.body.toBeDeliver[0].item_identification_number,
                        name: req.body.toBeDeliver[0].name,
                        price: req.body.toBeDeliver[0].price,
                        imageUrl: req.body.toBeDeliver[0].imageUrl,
                        deliverStatus: req.body.toBeDeliver[0].deliveryStatus, ///set delivery status by the owner
                        dateofdeliver: req.body.toBeDeliver[0].data, // set date of deliver
                    }
                }
            },{
                new: true,
            }
        );

        res.json(addedtoveliveries);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

}

export const DeliveredItems = async (req,res) => {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'ID not found' });

        const deliveredItems = await ClientModels.findByIdAndUpdate(
            id || req.params.id,
            {
                $push: {
                    Delivered: { 
                        item_identification_number: req.body.Delivered[0].item_identification_number,
                        name: req.body.Delivered[0].name,
                        price: req.body.Delivered[0].price,
                        imageUrl: req.body.Delivered[0].imageUrl,
                        deliverStatus: req.body.Delivered[0].deliveryStatus, ///set delivery status by the owner to delivered
                        dateofdelivered: req.body.Delivered[0].dateofdelivered, // set date of delivered item
                    }
                }
            },{
                new: true,
            }
        );

        res.json(deliveredItems);        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const deleteAllitems = async (req,res) => {

    const { id } = req.params;

    console.log(id);

    try {
        if(!id) return res.status(404).json({ message: 'ID not found' });
        await ClientModels.findByIdAndUpdate(
        id,
        {
            $set: {
                cart: [],
                wishlist: []
            }
        },
        { new: true },
        (error,respond) => {
            if(error) return;
            console.log(respond)
        }
        )
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

}

export const deleteItem = async (req,res) => {

    const { id } = req.params;

    try {

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'ID not found' });
        
        await ClientModels.findByIdAndUpdate(id, {
            $pull: {
                cart: {
                    product_identifier: req.body.cart[0].product_identifier
                }
            }
        },{
            new: true
        }).then(val => console.log(val)).catch(temp => console.log(temp));

        console.log('deleted');
        // need to fix this correct id wrong callback user !!! FIX THIS TOMMOROW !!

    } catch (error) {
        res.status(404).json(error);
    }
} 

export const wishtocart = async (req,res) => {
    const { id } = req.params;

    console.log(req.body);

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'ID not found' });

        await ClientModels.findByIdAndUpdate(
            id,
            {
                $push: {
                    cart: {
                        productname: req.body.cart[0].productname,
                        product_identifier: req.body.cart[0].product_identifier,
                        price: req.body.cart[0].price,
                        imageBase64: req.body.cart[0].imageBase64,
                        quantity: req.body.cart[0].quantity,
                        clientID: req.body.cart[0].clientID,
                        clientname: req.body.cart[0].clientname,
                        address: req.body.cart[0].address,
                        email: req.body.cart[0].email,
                        number: req.body.cart[0].number
                    }
                }
            },
            {
                new: true
            }
        )
    } catch (error) {
        res.status(404).json(error);
    }
}

export const deliverOTW = async (req,res) => {
    const { id } = req.params;

    console.log(id);

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'ID not found' });

        await ClientModels.findByIdAndUpdate(
            id,
            {
                $push: {
                    toBeDeliver: {
                        productname: req.body.toBeDeliver[0].productname,
                        product_identifier: req.body.toBeDeliver[0].product_identifier,
                        price: req.body.toBeDeliver[0].price,
                        imageBase64: req.body.toBeDeliver[0].imageBase64,
                        quantity: req.body.toBeDeliver[0].quantity,
                        clientID: req.body.toBeDeliver[0].clientID,
                        clientname: req.body.toBeDeliver[0].clientname,
                        address: req.body.toBeDeliver[0].address,
                        email: req.body.toBeDeliver[0].email,
                        number: req.body.toBeDeliver[0].number
                    }
                }
            },
            {
                new: true
            }
        )
    } catch (error) {
        res.status(404).json(error);
    }
}

export const Delivered = async (req,res) => {

    const { id } = req.params;

    // console.log(id);
    // console.log(req.body);

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'Invalid ID' });

        await ClientModels.findByIdAndUpdate(id,
            {
                $push: {
                    Delivered: {
                        product_identifier: req.body.Delivered[0].product_identifier,
                        productname: req.body.Delivered[0].productname,
                        price: req.body.Delivered[0].price,
                        imageBase64: req.body.Delivered[0].imageBase64,
                        clientname: req.body.Delivered[0].clientname,
                        address: req.body.Delivered[0].address
                    }
                }
            },
            {
                new: true
            }
        )

    } catch (error) {
        res.status(404).json(error);
    }

}

export const PullOrderedItem = async (req,res) => {

    const { id } = req.params;

    console.log(id);
    console.log(req.body);

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'invalid Id' });

        await ClientModels.findByIdAndUpdate(id,{
            $pull: {
                toBeDeliver: {
                    product_identifier: req.body.toBeDeliver[0].product_identifier
                }
            }
        },{
            new: true
        })
    } catch (error) {
        res.status(404).json(error);
    }
}

export const PullReceiveItem = async (req,res) => {

    const { id } = req.params;

    console.log(id);
    console.log(req.body);

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'invalid ID' });

        await ClientModels.findByIdAndUpdate(id,{
            $pull: {
                Delivered: {
                    _id: req.body.Delivered[0]._id
                }
            }
        },{
            new: true
        })

    } catch (error) {
        res.status(404).json(error);
    }

}