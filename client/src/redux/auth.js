const initialState = {
    isAdmin: false,
    isClient: false,
    isAdminAcc: undefined,
    isClientAcc: undefined,
}

const auth = (state = initialState,action) => {
    switch (action.type) {
        case 'ADMIN_AUTH':
            localStorage.setItem('Administrator', JSON.stringify({...action?.data}));
            return {...state, isAdminAcc: action?.data, isAdmin: true }
        case 'CLIENT_AUTH':
            localStorage.setItem('Client', JSON.stringify({...action?.data}));
            return {...state, isClientAcc: action?.data }
        case 'LOGOUT':
            localStorage.clear();
        default:
            return state;
    }
}

export default auth;