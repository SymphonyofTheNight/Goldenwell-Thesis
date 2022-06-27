import React from 'react';
import '../../../../scss/TransitionReceive.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { DeliveredItem } from '../../../../controllers/Actions.js';

const TransitionReceive = ({ ID, receive }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [client, setClient] = React.useState(JSON.parse(localStorage.getItem('Client')));
    const [text, setText] = React.useState('Receive Item....');
    const cover = React.useRef();

    const getProduct = useSelector(state => receive ? state.reducer.storage.map(data => data?.store.find(val => val.product_identifier === receive)) : null );

    const [clientID, setClientID] = React.useState('');
    const [productname, setProductname] = React.useState('');
    const [product_identifier, setProduct_identifier] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [imagebase64, setImagebase64] = React.useState('');
    const [clientname, setClientname] = React.useState('');
    const [address, setAddress] = React.useState('');

    React.useEffect(()=> {
        if(getProduct){
            setClientID(client.result._id);
            setProductname(getProduct[0]?.productname);
            setProduct_identifier(getProduct[0]?.product_identifier);
            setPrice(getProduct[0]?.price);
            setImagebase64(getProduct[0]?.imageBase64);
            setClientname(client.result.username);
            setAddress(client.result.address);
        }
    },[getProduct])

    // console.log(getProduct) // product

    React.useEffect(()=> {
      if(clientID && product_identifier && productname && price && imagebase64 && clientname && address && cover.current) {
        console.log(clientID,product_identifier,productname,price,imagebase64,clientname,address);
        dispatch(DeliveredItem(clientID,product_identifier,productname,price,imagebase64,clientname,address));
        cover.current.style.opacity = '0';
        setInterval(() => {
          history.push('/user/profile/');
          window.location.reload();
        }, 3000);
      }
    },[clientID && product_identifier && productname && price && imagebase64 && clientname && address])

  return (
    <div className={ID} ref={cover}>
        {text}
    </div>
  )

}

export default TransitionReceive;