import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5000/' });
// const api = axios.create({ baseURL: 'https://goldenwell.herokuapp.com/' });

export const getDatabase = () => api.get('/');
export const getCustomerDetails = () => api.get('/user');
export const adminLogin = (adminpost) => api.post('/admin', adminpost);
export const OwnerSignup = (user,pass) => api.post('/admin/signup', {
    username: user,
    password: pass
})

export const pullApproveAdminItem = (adminID,prodID) => api.patch(`/approve/redirect/${adminID}`,
{
    delivery: [
        {   
            _id: prodID
        }
    ]
}
)

export const addOrderAdmin = (ownerID,array) => api.patch(`/checkout/${ownerID}`,
    {
        delivery: array // array of 2 objects 
    }
)

export const AdminEditUsername = (adminID,username) => api.patch(`/admin/settings/${adminID}`, 
{
    username: username
})

export const AdminPasswordEdit = (adminId,password) => api.put(`admin/settings/${adminId}`, 
{
    password: password
})

// client side

export const addItem = (admin,product_identifier,productname,price,quantity,categoryfilter,description,specs,imageBase64,timestamp) => api.patch(`/admin/collections/all/${admin}`, 
    {
        store: [
            {
                product_identifier: product_identifier,
                productname: productname,
                price: price,
                quantity: quantity,
                categoryfilter: categoryfilter,
                description: description,
                specs: specs,
                imageBase64: imageBase64,
                timestamp: timestamp
            }
        ]
    }
);

export const updateItem = (admin,productname,price,quantity,categoryfilter,description,timestamp) => api.put(`/admin/collections/view/${admin}`,
    {
        store: [
            {
                productname: productname,
                price: price,
                quantity: quantity,
                categoryfilter: categoryfilter,
                description: description,
                timestamp: timestamp
            }
        ]
    }
) 

export const testingUpdate = (admin,product_identifier,productname,price,quantity,categoryfilter,description,specs,imageBase64,timestamp) => api.patch(`/admin/collections/view/${admin}`,
    {
        store: [
            {
                product_identifier: product_identifier,
                productname: productname,
                price: price,
                quantity: quantity,
                categoryfilter: categoryfilter,
                description: description,
                specs: specs,
                imageBase64: imageBase64,
                timestamp: timestamp
            }
        ]
    }
) 

export const removeItem = (admin,productID) => api.put(`/admin/collections/all/${admin}`,
    { 
        store: [
            {
                _id: productID,
            }
        ]
    } 
)

/// client api

export const deleteItem = (clientId,prodId) => api.put(`/${clientId}`, 
    {
        cart: [
            {
                product_identifier: prodId
            }
        ]
    }
)

export const removeAllItems = (clientID) => api.patch(`/${clientID}`);

export const CustomerRegistrationAPI = (customerReg) => api.post('/signup', customerReg);

export const ClientSignIn = (customerLogin) => api.post('/', customerLogin);

export const CustomerAddToCartAPI = (product_identifier,productname,price,imageBase64,quantity,customerID,clientname,address,email,number) => api.patch(`/collections/view/${customerID}`, 
    {
        cart: [
            {
                product_identifier: product_identifier,
                productname: productname,
                price: price,
                imageBase64: imageBase64,
                quantity: quantity,
                clientID: customerID,
                clientname: clientname,
                address: address,
                email: email,
                number: number
            }
        ],
})

export const CustomerAddToWishlistAPI = (product_identifier,productname,price,imageBase64,quantity,customerID,clientname,address,email,number) => api.put(`/collections/view/${customerID}`, 
    {
        wishlist: [
            {
                product_identifier: product_identifier,
                productname: productname,
                price: price,
                imageBase64: imageBase64,
                quantity: quantity,
                clientID: customerID,
                clientname: clientname,
                address: address,
                email: email,
                number: number
            }
        ]
})

export const WishtocartAPI = (product_identifier,productname,price,imageBase64,quantity,customerID,clientname,address,email,number) => api.patch(`/wishlist/addtocart/${customerID}`, 
    {
        cart: [
            {
                product_identifier: product_identifier,
                productname: productname,
                price: price,
                imageBase64: imageBase64,
                quantity: quantity,
                clientID: customerID,
                clientname: clientname,
                address: address,
                email: email,
                number: number
            }
        ]
    }
)

export const deliverOTW = (product_identifier,productname,price,imageBase64,quantity,customerID,clientname,address,email,number) => api.patch(`/admin/deliveries/${customerID}`, 
    {
        toBeDeliver: [
            {
                product_identifier: product_identifier,
                productname: productname,
                price: price,
                imageBase64: imageBase64,
                quantity: quantity,
                clientID: customerID,
                clientname: clientname,
                address: address,
                email: email,
                number: number
            }
        ]
    }
)
