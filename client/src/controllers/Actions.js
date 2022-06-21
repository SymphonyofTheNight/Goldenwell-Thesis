import * as api from '../api/api.js';

export const Delete_Item = (clientID,prodID) => async (dispatch) => {
    try {
        const { data } = await api.deleteItem(clientID,prodID);
        dispatch({ type: 'DELETE_ITEM', payload: data })
    } catch (error) {
        console.log(error);
    }
} 

export const Delete_All_Items = (clientID) => async (dispatch) => {
    try {
        const { data } = await api.removeAllItems(clientID);
        dispatch({ type: 'DELETE_ALL_ITEMS', payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const getDatabase = () => async (dispatch) => {
    try {
        const { data } = await api.getDatabase();
        dispatch({ type: 'GET_DATABASE', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getCustomer = () => async (dispatch) => {
    try {
        const { data } = await api.getCustomerDetails();
        dispatch({ type: 'GET_CUSTOMER', payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const Add_Product = (admin,product_identifier,productname,price,quantity,categoryfilter,description,specs,imageBase64,timestamp) => async (dispatch) => {
    try {
        const { data } = await api.addItem(admin,product_identifier,productname,price,quantity,categoryfilter,description,specs,imageBase64,timestamp);
        dispatch({ type: 'ITEM_ADDED', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const Update_Item = (admin,productname,price,quantity,categoryfilter,description,specs,timestamp) => async (dispatch) => {
    try {
        const { data } = await api.updateItem(admin,productname,price,quantity,categoryfilter,description,specs,timestamp);
        dispatch({ type: 'EDIT_ITEM', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const Testing_Item = (admin,product_identifier,productname,price,quantity,categoryfilter,description,specs,imageBase64,timestamp) => async (dispatch) => {
    try {
        const { data } = await api.testingUpdate(admin,product_identifier,productname,price,quantity,categoryfilter,description,specs,imageBase64,timestamp);
        dispatch({ type: 'EDIT_ITEM', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const Delete_Product = (admin,productID) => async (dispatch) => {
    try {
        const { data } = await api.removeItem(admin,productID);
        dispatch({ type: 'DELETE_ITEM', payload: data });
        console.log('good request');
    } catch (error) {
        console.log(error);
    }
}

export const CustomerAddToCart = (product_identifier,productname,price,imagebase64,quantity,customerID,clientname,address,email,number) => async(dispatch) => {
    try { 
        const { data } = await api.CustomerAddToCartAPI(product_identifier,productname,price,imagebase64,quantity,customerID,clientname,address,email,number);
        dispatch({ type: 'ADD_TO_CART', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const CustomerWishlist = (product_identifier,productname,price,imageBase64,quantity,customerID,clientname,address,email,number) => async (dispatch) => {
    try {
        const { data } = await api.CustomerAddToWishlistAPI(product_identifier,productname,price,imageBase64,quantity,customerID,clientname,address,email,number);
        dispatch({ type: 'ADD_TO_WISHLIST', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const CustomertoBeDeliver = (product_identifier,productname,price,imageBase64,quantity,customerID,clientname,address,email,number) => async (dispatch) => {
    try {
        const { data } = await api.deliverOTW(product_identifier,productname,price,imageBase64,quantity,customerID,clientname,address,email,number);
        dispatch({ type: 'DELIVERY', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const AddOrderToAdmin = (ownerID,array) => async (dispatch) => {
    try {
        const { data } = await api.addOrderAdmin(ownerID,array);
        dispatch({ type: 'DELIVERY', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const WishToCartAPI = (product_identifier,productname,price,imageBase64,quantity,customerID,clientname,address,email,number) => async (dispatch) => {
    try {
        const { data } = await api.WishtocartAPI(product_identifier,productname,price,imageBase64,quantity,customerID,clientname,address,email,number);
        dispatch({ type: 'ADD_TO_CART', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const AdminEditPass = (adminID,password) => async (dispatch) => {
    try {
        const { data } = await api.AdminPasswordEdit(adminID,password);
        dispatch({ type: 'EDIT_PASS', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const AdminEditUser = (adminID,username) => async (dispatch) => {
    try {
        const { data } = await api.AdminEditUsername(adminID,username);
        dispatch({ type: 'EDIT_USER', payload: data });
    } catch (error) {
        console.log(error);
    }
}
