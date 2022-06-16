import React, { useRef } from 'react';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import { Delete_All_Items, Delete_Item } from '../../../controllers/Actions.js';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../../../scss/MyCartSlider.scss';

const MyCartSlider = ({ ID, openmycart, setOpenmycart }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [customerLogged,setCustomerLogged] = React.useState(JSON.parse(localStorage.getItem('Client')));

    // const getClient = useSelector(state => customerLogged ? state.CustomerReducer.storage : null);

    // const getCart = useSelector(state => customerLogged ? state.CustomerReducer.storage?.find(val => val._id === customerLogged.result._id ) : null);

    const getCart = useSelector(state => customerLogged?.result?._id ? state.CustomerReducer.storage?.find(val => val._id === customerLogged?.result?._id ) : null);

    const [number, setNumber] = React.useState(0);
    const [checkbox, setCheckbox] = React.useState(false);
    const [prodId, setProdId] = React.useState();

    const cartslide = useRef();

    React.useEffect(()=> {
        if(getCart){
            const total = getCart?.cart?.map(state => {
                return state.price
            })

            if(total){
                let totalpay = total.reduce((cur,prev)=> cur + prev,0);
                setNumber(totalpay);
            }
        }
    },[getCart])

    React.useEffect(()=> {
        if(!openmycart) return cartslide.current.style.transform = 'translateX(100%)';
        cartslide.current.style.transform = 'translateX(0%)';
    },[openmycart])

    const cartslidetoggle = () => {
        setOpenmycart(state => !state)
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

    const deleteOne = (e) => {
        e.preventDefault()
        if(prodId && customerLogged.result._id){
            console.log(getCart._id,prodId);
            dispatch(Delete_Item(getCart._id,prodId));
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        }
    }

    const MyCart = <div className={ID}  ref={cartslide}>
        <div className='labelContainer'>
            <span className='label'>
                My Cart
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

            {getCart && getCart.cart?.map(state => {
                return (
                    <div className='innerContainerList' key={state}>
                        <div className='itemContainer'>
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
                                <div className='deleteFunctionContainer'>
                                <div className='priceContainer'>
                                    <span className='text'>
                                         ₱ {state.price} 
                                    </span>
                                </div>
                                <div className='deleteBtnContainer'>
                                    <form onSubmit={deleteOne}>
                                        <button className='deletebtn'
                                            onClick={()=> {
                                                setProdId(state.product_identifier)
                                            }}
                                            type='submit'>
                                            <FaTrash className='trash'/>
                                         </button>
                                    </form>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                )
            })}

            {/* {getCart && getCart.cart?.map(state => {
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
                                    <form onSubmit={deleteOne}>
                                        <button className='deletebtn'
                                            onClick={()=> {
                                                setProdId(state.product_identifier)
                                            }}
                                            type='submit'>
                                            <FaTrash className='trash'/>
                                         </button>
                                    </form>
                                </div>
                            </div>
                        </div> 
                    </div>
                )
            })} */}

        </div>
        <div className='checkoutContainer'>
            <button className='checkoutbtn'
                onClick={()=> {
                    history.push('/checkout')
                }}git 
            >
                PROCEED TO CHECKOUT({getCart?.cart?.length})
            </button>
        </div>
    </div>

  return (
    <div>
        {MyCart}
    </div>
  )
}

export default MyCartSlider;