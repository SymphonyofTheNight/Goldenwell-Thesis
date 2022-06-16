import React from 'react';
import { FaPlus, FaArrowLeft, FaTrash } from 'react-icons/fa';
import { Delete_All_Items, Delete_Item } from '../../../controllers/Actions.js';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../../../scss/Wishlist.scss';

const Wishlist = ({ ID, openmywishlist, setOpenmywishlist, setWishtocart, wishtocart, setTransition }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [customerLogged,setCustomerLogged] = React.useState(JSON.parse(localStorage.getItem('Client')));

    const getClient = useSelector(state => customerLogged ? state.CustomerReducer.storage : null);

    const getWishlist = useSelector(state => customerLogged ? state.CustomerReducer.storage?.find(val => val._id === customerLogged.result._id ) : null);

    const [number, setNumber] = React.useState(0);
    const [cartlength, setCartlength] = React.useState(0);
    const [checkbox, setCheckbox] = React.useState(false); // select all 
    const [prodId, setProdId] = React.useState();

    const cartslide = React.useRef();

    React.useEffect(()=> {
        if(getClient){
            const total = getClient.map(state => {
                return state?.cart.flatMap(prod => {
                    if(isNaN(prod?.price)){
                        return;
                    }else{
                        return prod?.price
                    }
                })
            })
            if(total[0]){
                let arr = total[0]
                let totalpay = arr.reduce((cur,prev)=> cur + prev,0);
                setNumber(totalpay);
            }
        }
    },[getClient]);

    React.useEffect(()=> {
        if(getClient) {
            const cartLength = getClient.map(state => state?.cart.length);
            if(cartLength[0]) setCartlength(cartLength[0])
        }
    },[getClient])

    React.useEffect(()=> {
        if(!openmywishlist) return cartslide.current.style.transform = 'translateX(100%)';
        cartslide.current.style.transform = 'translateX(0%)';
    },[openmywishlist])

    const cartslidetoggle = () => {
        setOpenmywishlist(state => !state)
    }

    const deleteAllonSubmit = (e) => {
        e.preventDefault();
        console.log(customerLogged.result._id);
        if(checkbox && customerLogged.result._id) {
            dispatch(Delete_All_Items(customerLogged.result._id));
            window.location.reload();
        }else {
            return;
        }
    }

    const AddToCart = (e) => {
        e.preventDefault();

        // create cover for transition

        setTimeout(()=> {
            history.push(`/wishlist/addtocart/${wishtocart}`)
        }, 1500)
        // console.log(customerLogged.result._id,prodId)
        // if(prodId && customerLogged.result._id) return dispatch(Delete_Item(customerLogged.result._id,prodId));
    }

    // READ THIS TOMMOROW NEED TO CREATE SAME AS CART SLIDER FOR WISHLIST!

    const MyWishlist = <div className={ID} ref={cartslide}> 
        <div className='labelContainer'>
            <span className='label'>
                My Wishlist
            </span>
            <button className='backbtn'
                onClick={cartslidetoggle}
            >
                <FaArrowLeft className='icon'/>
            </button>
        </div>
        <div className='selecAllContainer'>
            <div className='innerContainerSelect'>
                <input type='checkbox' className='checkbox'
                    onChange={() => {
                        return setCheckbox(state => !state)
                    }}
                />
                <span className='textLabel'>
                    Select All
                </span>
                <form onSubmit={deleteAllonSubmit}>
                <button className='deleteAllbtn' 
                type='submit'
                >
                    <FaTrash className='trash'/>
                </button>
                </form>
            </div>
        </div>
        <div className='listContainer'>

        {getWishlist?.wishlist && getWishlist?.wishlist?.map(state => {
                return (
                    <div className='innerContainerList' key={state}>
                        <div className='itemContainer' >
                                <div className='imgContainer'>
                                    <img src={state.imageBase64} className='img'/>
                                </div>
                                <div className='detailContainer'>
                                    <div className='itemnameContainer'>
                                        <span className='text'> 
                                            {state.productname}
                                        </span>
                                    </div>
                                <div className='stockdetailsContainer'>
                                        <span className='text'>
                                            Only {state.quantity} item(s) in stock
                                        </span>
                                </div>
                                        </div>
                                        <div className='deleteFunctionContainer'>
                                            <div className='priceContainer'>
                                            <span className='text'>
                                                    ₱ {state.price} 
                                            </span>
                                            </div>
                                            <div className='deleteBtnContainer'>
                                                <form onSubmit={AddToCart}>
                                                <button className='deletebtn'
                                                onClick={()=> {
                                                    setWishtocart(state._id)
                                                    setTransition(state => !state)
                                                    // add wishslider off
                                                }}
                                                type='submit'
                                                >
                                                    <FaPlus className='trash'/>
                                                </button>
                                                </form>
                                            </div>
                                        </div>
                        </div> 
                    </div>
                )
            })}



            {/* {getClient && Object.keys(getClient).map((key)=> {
                return (
                    <div className='innerContainerList' key={key}>
                        {key && getClient[key].wishlist.map(state => {
                            return (
                                <div className='itemContainer' key={state}>
                                    <div className='imgContainer'>
                                        <img src={state.imageBase64} className='img'/>
                                    </div>
                                    <div className='detailContainer'>
                                        <div className='itemnameContainer'>
                                            <span className='text'> 
                                                {state.productname}
                                            </span>
                                        </div>
                                        <div className='stockdetailsContainer'>
                                               <span className='text'>
                                                   Only {state.quantity} item(s) in stock
                                               </span>
                                        </div>
                                    </div>
                                    <div className='deleteFunctionContainer'>
                                        <div className='priceContainer'>
                                           <span className='text'>
                                                ₱ {state.price} 
                                           </span>
                                        </div>
                                        <div className='deleteBtnContainer'>
                                            <form onSubmit={AddToCart}>
                                            <button className='deletebtn'
                                            onClick={()=> {
                                                setWishtocart(state._id)
                                                setTransition(state => !state)
                                                // add wishslider off
                                            }}
                                            type='submit'
                                            >
                                                <FaPlus className='trash'/>
                                            </button>
                                            </form>
                                        </div>
                                    </div>
                                </div> 
                            )
                        })}
                    </div>
                )
            })} */}
        </div>
    </div>


  return (
    <div>
        {MyWishlist}
    </div>
  )
}

export default Wishlist