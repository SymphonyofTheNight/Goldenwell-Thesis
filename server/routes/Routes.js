import express from 'express';
import middleware from '../validate/middleware.js';
import { validate } from '../validate/validate.js';
const router = express.Router();

///////////////////////////////// owner router

import { getOwnerProducts, addOwnerProducts, deleteProduct, updateProduct, toDeliver } from '../controllers/OwnerControllers.js';
import { ownersignup,ownersignin, EditOwnerPassword, EditOwnerUsername } from '../controllers/OwnerAuthentication.js';

router.get('/', getOwnerProducts); // done
router.patch('/admin/collections/all/:id', addOwnerProducts); // done
router.patch('/admin/collections/view/:id', updateProduct); // working but gives status 404
router.put('/admin/collections/all/:id', deleteProduct); // fix delete query
router.patch('/admin/settings/:id', EditOwnerUsername);
router.put('/admin/settings/:id', EditOwnerPassword);
router.patch('/checkout/:id', toDeliver); // try this mofo
// router.put('/checkout/:id', ); // try this 
// router.patch('/checkout/:id', CreateUserToDeliver); // need to fix this later

router.post('/admin', ownersignin); // done
router.post('/admin/signup/', ownersignup); // done

///////////////////////////////// client router

import { clientsignup,clientsignin } from '../controllers/ClientAuthentication.js';
import { tobeDeliver,DeliveredItems,getClientProducts,AddProdToCard, Addtowishlist, deleteAllitems, deleteItem, wishtocart } from '../controllers/ClientController.js';

router.post('/', clientsignin); // done
router.patch('/:id', deleteAllitems); // 
router.put('/:id', deleteItem); //
router.post('/signup', clientsignup); // done
router.get('/user', getClientProducts); // getcustomerDetails
router.patch('/collections/view/:id', AddProdToCard); //finished
router.put('/collections/view/:id', Addtowishlist); // finished
router.patch('/wishlist/addtocart/:id', wishtocart);

//from cart to checkouts

router.patch('/cart/checkout/:id', tobeDeliver); // go to checkout from cart to deliver
// router.patch('/checkout/:id', ); // go to checkout from cart to walkin

/// if the costumer click the receive ... the item will sent to delivered.

router.patch('/delivered/:id', DeliveredItems); // where item delivered items go here.

export default router;

// to be continue on other routes...


//TAKE NOTES HERE
///// client side route for product menu  = collection/all