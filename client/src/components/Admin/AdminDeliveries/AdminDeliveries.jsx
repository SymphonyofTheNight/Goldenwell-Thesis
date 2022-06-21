import React from 'react';
import '../../../scss/AdminDeliveries.scss';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { CustomertoBeDeliver } from '../../../controllers/Actions.js';

const AdminDeliveries = ({ ID }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const getDeliveries = useSelector(state => state.reducer.storage);

    const [deliveries, setDeliveries] = React.useState();
    const [getProduct, setGetProduct] = React.useState();
    const [toggleView, setToggleView] = React.useState(false);

    const [product_to_send, setProduct_to_send] = React.useState();

    React.useEffect(()=> {
        if(getDeliveries[0]){
            setDeliveries(getDeliveries[0]?.delivery);
        }
    },[getDeliveries])

    const getTodeliverProduct = useSelector(state => getProduct ? state.reducer.storage.map(val => val?.delivery.find(product => product._id === getProduct)) : null)

    const [clientId, setClientId] = React.useState(''); // client id 
    const [productname, setProductname] = React.useState('');
    const [product_identifier, setProduct_identifier] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [imagebase64, setImagebase64] = React.useState('');
    const [clientname, setClientname] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [number, setNumber] = React.useState('');

    // React.useEffect(()=> {
    //     if(getTodeliverProduct[0]){
    //     console.log(getTodeliverProduct[0]?.price)
    //     }
    // },[getTodeliverProduct])

    React.useEffect(()=> {
        if(getTodeliverProduct){
            setClientId(getTodeliverProduct[0]?.clientID);
            setProductname(getTodeliverProduct[0]?.productname);
            setProduct_identifier(getTodeliverProduct[0]?.product_identifier);
            setQuantity(getTodeliverProduct[0]?.quantity);
            setPrice(getTodeliverProduct[0]?.price);
            setImagebase64(getTodeliverProduct[0]?.imageBase64);
            setClientname(getTodeliverProduct[0]?.clientname);
            setAddress(getTodeliverProduct[0]?.address);
            setEmail(getTodeliverProduct[0]?.email);
            setNumber(getTodeliverProduct[0]?.number);
        }
    },[getTodeliverProduct])

    const onSubmitHandler = (e) => {
        e.preventDefault();
        // console.log(clientId,clientname,productname,product_identifier,quantity,price,imagebase64,address,email,number);
        if(clientId && clientname && productname && product_identifier && quantity && price && imagebase64 && address && email && number){
            dispatch(CustomertoBeDeliver(product_identifier,productname,price,imagebase64,quantity,clientId,clientname,address,email,number));
            // setTimeout(() => {
                
            // }, 2000);
        }
    }

    return (
        <div className={ID}>
            <div className='innerAdminUserContainer-1'>

                <div className='labelContainer'>
                    <span className='text'>
                        Deliveries
                    </span>
                </div>

                <div className='inner-container'>
                    <div className='labelContainer'>
                        <div className='imgLabel'>
                            <span className='text'>
                                Image
                            </span>
                        </div>
                        <div className='IDLabel'>
                            <span className='text'>
                                Product_ID
                            </span>
                        </div>
                        <div className='nameLabel'>
                            <span className='text'>
                                Client Name
                            </span>
                        </div>
                        <div className='addressLabel'>
                            <span className='text'>
                                Address
                            </span>
                        </div>
                        <div className='productnameLabel'>
                            <span className='text'>
                                Product
                            </span>
                        </div>
                        <div className='viewProductLabel'>
                            <span className='text'>
                                View
                            </span>
                        </div>
                    </div>
                    <div className='deliveriesContainer'>
                        {deliveries && Object.keys(deliveries).map(state => {
                            return (
                                <div className='items' key={deliveries[state]._id}>
                                    <div className='ClientImgContainer'>
                                        <img src={deliveries[state].imageBase64} className='img'/>
                                    </div>
                                    <div className='ClientProductIDContainer'>
                                        <span className='text'>
                                            {deliveries[state].product_identifier}
                                        </span>
                                    </div>
                                    <div className='ClientNameContainer'>
                                        <span className='text'>
                                            {deliveries[state].clientname}
                                        </span>
                                    </div>
                                    <div className='ClientAddressContainer'>
                                        <span className='text'>
                                            {deliveries[state].address}
                                        </span>
                                    </div>
                                    <div className='ClientProductContainer'>
                                        <span className='text'>
                                            {deliveries[state].productname}
                                        </span>
                                    </div>
                                    <div className='ViewContainer'>
                                        <button className='btnView'
                                            onClick={()=> {
                                                setGetProduct(deliveries[state]._id)
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

            {
                toggleView && 
                <div className='viewProductContainer'>
                    {getTodeliverProduct && getTodeliverProduct.map(state => {
                        return (
                        <div className='innerViewProductContainer' key={state._id}>
                            <form onSubmit={onSubmitHandler}>
                            <div className='ImgContainer'>
                                <img src={state.imageBase64} />
                            </div>
                            <div className='ProductnameContainer'>
                                <span className='text'>
                                    Product: {state.productname}
                                </span>
                            </div>
                            <div className='AddressContainer'>
                                <span className='text'>
                                    Address: {state.address}
                                </span>
                            </div>
                            <div className='ClientContainer'>
                                <span className='text'>
                                    Customer: {state.clientname}
                                </span>
                            </div>
                            <div className='EmailContainer'>
                                <span className='text'>
                                    Email: {state.email}
                                </span>
                            </div>
                            <div className='NumberContainer'>
                                <span className='text'>
                                    Number: {state.number}
                                </span>
                            </div>
                            <div className='PriceContainer'>
                                <span className='text'>
                                    Price: {state.price}
                                </span>
                            </div>
                            <div className='SubmitContainer'>
                                <button className='btnSubmit'
                                type='submit'
                                >
                                    Approve Delivery
                                </button>
                            </div>
                            </form>
                        </div>
                        )
                    })}

                    {/* btnClose */}

                    {/* REMINDER !! TO SEND THE PRODUCT TO CLIENT YOU HIS ID */}

                    <button className='btnClose'
                        onClick={()=>{
                            setToggleView(state => !state)
                        }}
                    >
                        <FaTimes className='logo'/>
                    </button>

                </div>
            }

            

        </div>
    )
}

export default AdminDeliveries;