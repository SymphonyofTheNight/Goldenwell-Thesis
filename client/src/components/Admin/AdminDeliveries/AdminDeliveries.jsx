import React from 'react';
import '../../../scss/AdminDeliveries.scss';
import { useSelector } from 'react-redux';

const AdminDeliveries = ({ ID }) => {

    const getDeliveries = useSelector(state => state.reducer.storage);

    const [deliveries, setDeliveries] = React.useState();

    React.useEffect(()=> {
        if(getDeliveries[0]){
            setDeliveries(getDeliveries[0]?.delivery);
        }
    },[getDeliveries])

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
                            console.log(deliveries[state])
                            return (
                                <div className='items' key={deliveries[state]._id}>
                                    <div className='ClientImgContainer'>
                                        <img src={deliveries[state].imageBase64} className='img'/>
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
                                        <button className='btnView'>
                                            View
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>


                {/* <div className='labelContainer'>
                    <span className='text'>
                        Deliveries
                    </span>
                </div>

                <div className='deliveriesContainer'>
                    {deliveries && Object.keys(deliveries).map(state => {
                        console.log(deliveries[state])
                        return (
                            <div className='items' key={deliveries[state]._id}>
                                <div className='ClientNameContainer'>

                                </div>
                                <div className='ClientAddressContainer'>

                                </div>
                                <div className='ClientProductContainer'>

                                </div>
                                <div className='ViewContainer'>

                                </div>
                            </div>
                        )
                    })}
                </div> */}

            </div>
        </div>
    )
}

export default AdminDeliveries;