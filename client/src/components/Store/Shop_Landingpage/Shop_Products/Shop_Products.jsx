import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import hikvisioncam1 from '../../../../prod_img/hikvisioncam1.png';

const Shop_Products = ({ setSelectedProdId }) => {

    React.useEffect(()=> {
        axios.get('https://goldenwell.herokuapp.com/')
        .then(res => {
            setContainer(res.data);
        }).catch(err => {
            console.log(err);
        })
    },[])
    
    const [container, setContainer] = React.useState([]);
    const [objectsArray, setObjectsArray] = React.useState([]);
    const [shuffled, setShuffled] = React.useState([]);

    const history = useHistory();

    React.useEffect(()=> {
        container.map(data => {
            setObjectsArray(data.store);
        })
    },[container])
    
    const shuffle = (item) => {

        for(let i = item?.length - 1; i > 0; i--){
    
            const randomIndex = Math.floor(Math.random() * (i + 1))
    
            const temp = item[i];
            item[i] = item[randomIndex];
            item[randomIndex] = temp;

        }

        return item;
    
    }
    shuffle(objectsArray);

   React.useEffect(()=>{
        if(objectsArray.length >= 2){
            setShuffled(objectsArray.slice(1, 3));
        }
   },[objectsArray.length >= 2])

    return (
        <>
        {shuffled && shuffled.map(state => {
            return (
                 <button className='imgContainer' key={state._id} onClick={()=> {
                     setSelectedProdId(state.product_identifier)
                     window.scrollTo(0,0);
                     history.push(`/collections/view/`);
                 }}>
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
        </>
    )
}

export default Shop_Products;
