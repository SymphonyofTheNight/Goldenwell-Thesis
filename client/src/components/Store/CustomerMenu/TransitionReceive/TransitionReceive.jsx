import React from 'react';
import '../../../../scss/TransitionReceive.scss';
import { useSelector, useDispatch } from 'react-redux';
import { ItemReceive } from '../../../../controllers/Actions.js';
import { useHistory } from 'react-router-dom';

const TransitionReceive = ({ ID, receive }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [client, setClient] = React.useState(JSON.parse(localStorage.getItem('Client')));
    const [text, setText] = React.useState('Receive Item....');
    const cover = React.useRef();

    const getProduct = useSelector(state => receive ? state.reducer.storage.map(data => data?.store.find(val => val.product_identifier === receive)) : null );

    const [productname, setProductname] = React.useState('');
    const [product_identifier, setProduct_identifier] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [imagebase64, setImagebase64] = React.useState('');
    const [clientname, setClientname] = React.useState('');
    const [address, setAddress] = React.useState('');

    React.useEffect(()=> {
        if(getProduct){
            setProductname(getProduct[0]?.productname);
            setProduct_identifier(getProduct[0]?.product_identifier);
            setPrice(getProduct[0]?.price);
            setImagebase64(getProduct[0]?.imageBase64);
            setClientname(client.result.username);
            setAddress(client.result.address);
        }
    },[getProduct])

  return (
    <div className={ID} ref={cover}>
        {text}
    </div>
  )

}

export default TransitionReceive;