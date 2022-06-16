import React from 'react';
import axios from 'axios';
import '../../../scss/Shop_Collection.scss';

const Shop_Collection = ({ ID }) => {

    React.useEffect(()=> {
        axios.get('http://localhost:5000/')
        .then(res => {
            setContainer(res.data);
        }).catch(err => {
            console.log(err);
        })
    },[])
    
    const [container, setContainer] = React.useState([]);
    const [objectsArray, setObjectsArray] = React.useState([]);

    React.useEffect(()=> {
        container.map(data => {
            setObjectsArray(data.store);
        })
    },[container])

    return (
        <div className={ID}>

            <div className='titleContainer'>
                <span className='txt'>PRODUCTS</span>
            </div>
            <div className='categoryContainer'>
                <span className='txt'>Items</span>
            </div>

            <div className='itemsContainer'>
                {objectsArray && objectsArray.map(state => {
                    return (
                        <button className='imgContainer' key={state._id}>
                            <div className='container-1'>
                                <div className='statusContainer'
                                style={{
                                    backgroundColor: state.quantity > 0 ? 'black' : 'red'
                                }}
                                >
                                    {state.quantity > 0 ? 'IN STOCK NOW' : 'OUT OF STOCK'}
                                </div>
                            </div>
                            <img src={state.imageBase64} className='img'/>
                            <div className='labelContainer'>
                                <div className='label'>
                                    <span className='txt'>
                                        {state.productname}
                                    </span>
                                </div>
                                <div className='price'>
                                    <span className='txt'>
                                        Php {state.price}
                                    </span>
                                </div>
                            </div>
                        </button>
                    )
                })}
            </div>

        </div>
    )
}

export default Shop_Collection;
