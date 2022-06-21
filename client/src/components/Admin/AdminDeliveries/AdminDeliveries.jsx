import React from 'react';
import '../../../scss/AdminDeliveries.scss';
import { useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';

const AdminDeliveries = ({ ID }) => {

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
                        console.log(state)
                        return (
                        <div className='innerViewProductContainer' key={state._id}>
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
                        </div>
                        )
                    })}

                    {/* btnClose */}

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