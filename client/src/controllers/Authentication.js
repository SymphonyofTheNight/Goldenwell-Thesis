import * as api from '../api/api.js';

export const AdministratorLogin = (adminpost,history) => async (dispatch) => {
    try {
        const { data } = await api.adminLogin(adminpost);
        dispatch({ type: 'ADMIN_AUTH', data: data });

        history.push('/admin/home');
    } catch (error) {
        console.log(error);
    }
}

export const ClientSign = (customerLogin) => async (dispatch) => {
    try {
        const { data } = await api.ClientSignIn(customerLogin);
        dispatch({ type: 'CLIENT_AUTH', data: data });
    } catch (error) {
        console.log(error);
    }
}

export const CustomerSignup = (customerSignup) => async (dispatch) => {
    try {
        const { data } = await api.CustomerRegistrationAPI(customerSignup);
        dispatch({ type: 'ADD_CUSTOMER', payload: data })
    } catch (error) {
        console.log(error);
    }
}
