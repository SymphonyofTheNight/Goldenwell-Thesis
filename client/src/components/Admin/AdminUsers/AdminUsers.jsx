import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import '../../../scss/AdminUsers.scss';
import ViewProduct from '../AdminCollections/ViewProduct/ViewProduct';

const AdminUsers = ({ ID }) => {

    const history = useHistory();
    
    const [getCustomer, setGetCustomer] = React.useState();
    const [filter, setFilter] = React.useState(' ');
    const [toggleView, setToggleView] = React.useState(false);
    const user_client = useSelector(state => state.CustomerReducer.storage);
    const viewCustomer = useSelector(state => getCustomer ? state.CustomerReducer.storage.find(val => val._id === getCustomer) : null);

    console.log(viewCustomer);

    // console.log(user_client); 

    if(!localStorage.getItem('Administrator')) return <Redirect to='/admin'/>


    return (
        <div className={ID}>
           <div className='innerAdminUserContainer-1'>

                <div className='searchAndfilterContainer'>
                    <div className='searchContainer'>
                       <input className='inputForm' type='text' 
                        onChange={(e)=> {
                            setFilter(e.target.value)
                        }}
                       />
                    </div>
                    <div className='searchLabelContainer'>
                        SEARCH
                    </div>
                </div>

                <div className='userContainer'>
                    <div className='titleLabel'>
                        <span className='text'>
                            Customer Accounts
                        </span>
                    </div>
                    <div className='clientsContainer'>
                        {user_client && user_client.filter(val => {
                            if(filter === ' '){
                                return val;
                            }else if(val._id?.toLowerCase().includes(filter?.toLowerCase())){
                                return val;
                            }
                        }).map(state => {
                            return (
                                <div className='accounts' key={state._id}>
                                    <div className='idContainer'>
                                        {state._id}
                                    </div>
                                    <div className='nameContainer'>
                                        <span className='text'>
                                            {state.fullname}
                                        </span> 
                                    </div>
                                    <div className='addressContainer'>
                                        <span className='text'>
                                            {state.address}
                                        </span> 
                                    </div>
                                    <div className='numberContainer'>
                                        <span className='text'>
                                            +63 {state.number}
                                        </span> 
                                    </div>
                                    <div className='buttonContainer'>
                                        <button className='btnView'
                                            onClick={()=> {
                                                setGetCustomer(state._id)
                                                setToggleView(state => !state)
                                            }}
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

           </div>

            {toggleView && 
                <div className='ViewCustomer'>
                    <div className='innerViewCustomer'>
                        <div className='nameContainer'>
                            <span className='text'>
                                Name: {viewCustomer.fullname}
                            </span>
                        </div>
                        <div className='addressContainer'>
                            <span className='text'>
                                Address: {viewCustomer.address}
                            </span>
                        </div>
                        <div className='emailContainer'>
                            <span className='text'>
                                Email: {viewCustomer.email}
                            </span>
                        </div>
                        <div className='googleidContainer'>
                            <span className='text'>
                                Google ID: {viewCustomer.google_id}
                            </span>
                        </div>
                        <div className='numberContainer'>
                            <span className='text'>
                                Number: {viewCustomer.number}
                            </span>
                        </div>
                        <div className='birthdayContainer'>
                            <span className='text'>
                                Birthday: {viewCustomer.birthday}
                            </span>
                        </div>
                        <div className='cartContainer'>
                            <div className='labelContainer'>
                                <span className='text'>
                                    {viewCustomer.cart.length === 0 ? '' : 'CART'}
                                </span>
                            </div>
                            <div className='ItemContainer'>
                                {viewCustomer && viewCustomer.cart.map(state => {
                                    return (
                                        <div className='item'>
                                            <div className='name'>
                                                <span className='text'>
                                                    {state.productname}
                                                </span>
                                            </div>
                                            <div className='price'>
                                                <span className='text'>
                                                    Price: {state.price}
                                                </span>    
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='wishlistContainer'>
                            <div className='labelContainer'>
                                <span className='text'>
                                    {viewCustomer.wishlist.length === 0 ? '' : 'WISHLIST'}
                                </span>
                            </div>
                            <div className='ItemContainer'>
                                {viewCustomer && viewCustomer.wishlist.map(state => {
                                    return (
                                        <div className='item'>

                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* close btn */}

                    <div className='btnContainer'>
                        <button className='btnClose'
                            onClick={()=> {
                                setToggleView(state => !state)
                            }}
                        >
                            <FaTimes className='icon'/>
                        </button>
                    </div>

                </div>
            }            

        </div>
    )
}

export default AdminUsers;
