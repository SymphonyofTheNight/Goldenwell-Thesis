import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { WishToCartAPI } from '../../../../controllers/Actions.js';
import '../../../../scss/AddToCart.scss';

const AddToCart = ({ ID , wishtocart, setTransition, setOpenmywishlist }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [customerLogged,setCustomerLogged] = React.useState(JSON.parse(localStorage.getItem('Client')));
    // const product = useSelector(state => state.CustomerReducer.storage.map(prod => prod.wishlist.find(item => item._id === wishtocart )));
    const getTargetClientWishlist = useSelector(state => state.CustomerReducer.storage.find(state => state._id === customerLogged.result._id ));

    const [prodset, setProdset] = React.useState({
        product_identifier: '', productname: '', quantity: '', price: '', imageBase64: '', email: '', clientname: '', clientID: '', address: '', _id: '', number: ''
    })

    const text = useRef();
    const cover = useRef();

    const [textCon, setTextCon] = useState('Adding to cart...');
      
    // console.log(getTargetClientWishlist.wishlist.find(state => state._id === wishtocart));

    var product = getTargetClientWishlist.wishlist.find(state => state._id === wishtocart)

    React.useState(()=> {
          if(product) {
            setProdset({...prodset, 
                product_identifier: product?.product_identifier,
                productname: product?.productname,
                quantity: product?.quantity,
                price: product?.price,
                imageBase64: product?.imageBase64,
                email: product?.email,
                clientname: product?.clientname,
                clientID: product?.clientID,
                address: product?.address,
                number: product?.number,
                _id: product?._id
            })
        }
    },[product])

    // console.log(product.productname)
    // console.log(wishtocart);
    // console.log(product);

    React.useEffect(()=> {
        text.current.style.opacity = '1'
        setInterval(()=> {
            setTextCon('Done');
        }, 2000)
        if(prodset){
            setTimeout(()=> {
                console.log(prodset);
                dispatch(WishToCartAPI(prodset.product_identifier,prodset.productname,prodset.price,prodset.imageBase64,prodset.quantity,prodset.clientID,prodset.clientname,prodset.address,prodset.email,prodset.number));
                setTransition(state => !state)
                history.push('/');
                window.location.reload();
            }, 3000)
        }
        setTimeout(()=> {
            setOpenmywishlist(state => !state)
            cover.current.style.filter = 'blur(10px)';
            cover.current.style.opacity = '0'
        }, 2500)
    },[prodset])

    return (
        <div className={ID} ref={cover}>
            <span className='text' ref={text}>
                {textCon}
            </span>
        </div>
    )
}

export default AddToCart;