const initialState = {
    storage: [],
    cartStorage: [],
    wishlistStorage: []
}

const CustomerReducer = (state = initialState,action) => {
    switch (action.type) {
        case 'GET_CUSTOMER':
            return {
                storage: action.payload
            }
        case 'ADD_CUSTOMER': 
            return {
                storage: action.payload
            }
        case 'ADD_TO_CART': 
            return {
                cartStorage: action.payload
            }
        case 'DELETE_ALL_ITEMS': 
            return {
                cartStorage: state.cartStorage.map(state => {
                    return state;
                })
            }
        case 'DELETE_ITEM': 
            return {
                cartStorage: state.cartStorage.map(state => state.cart.filter(prod => prod.product_identifier !== action.payload))
            }
        case 'ADD_TO_WISHLIST': 
            return {
                wishlistStorage: action.payload
            }
        case 'DELIVERY':
            return {
                storage: action.payload 
            }
        case 'EDIT_CUSTOMER':
            return {
                storage: state.storage.map(client => client._id === action.payload._id ? action.payload : client )
            }
        default:
            return {...state};
    }
}

export default CustomerReducer;