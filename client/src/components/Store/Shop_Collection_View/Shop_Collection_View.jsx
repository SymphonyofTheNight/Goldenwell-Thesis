import React from 'react';
import axios from 'axios';
import { CustomerAddToCart, CustomerWishlist } from '../../../controllers/Actions.js';
import { FaHeart, FaMinus, FaPlus, FaCartPlus} from 'react-icons/fa';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
// import logo from '../../../img/logo.png';
import '../../../scss/Shop_Collection_View.scss';

//view product hover photos 
import unsplash_1 from '../../../img/unsplash_1.jpg';
import unsplash_4 from '../../../img/unsplash_4.jpg';
import unsplash_8 from '../../../img/unsplash_8.jpg';
import unsplash_3 from '../../../img/unsplash_3.jpg';


const Shop_Collection_View = ({ ID,selectedProdId, setTransition }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const calendar = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    const quotesArr = [
        'Provides genuinely known security monitoring system products that enables you to always keep a watchful eye around or in your business.',
        'Long lasting and quality assured products with taste of satisfaction and performance.'
    ]

    const [container, setContainer] = React.useState();
    const [changeBG, setChangeBG] = React.useState(unsplash_1);
    const [quoteText, setQuoteText] = React.useState(quotesArr[0]);

    React.useEffect(()=>{
        axios.get('http://localhost:5000/')
        .then(res => {
            //get store data
            setContainer(res.data.map(state => state.store));
        }).catch(err => {
            console.log(err)
        })
    },[])

    // React.useEffect(()=>{
    //     axios.get('https://goldenwell.herokuapp.com/')
    //     .then(res => {
    //         //get store data
    //         setContainer(res.data.map(state => state.store));
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // },[])

    console.log();

    // get specific product based on selectedProdId = product_identifier
    const getProduct = useSelector(state => selectedProdId ? state.reducer.storage.map(data => data.store.find(prod => prod.product_identifier === selectedProdId)) : null);
    const [getCustomerLoggedIn, setGetCustomerLoggedIn] = React.useState(JSON.parse(localStorage.getItem('Client')));

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
    
    const [counter, setCounter] = React.useState(0);

    React.useEffect(()=> {
        if(getCustomerLoggedIn){
            if(getProduct[0]){
                setClientId(getCustomerLoggedIn.result?._id);
                setProductname(getProduct[0].productname);
                setProduct_identifier(getProduct[0].product_identifier);
                setQuantity(getProduct[0].quantity);
                setPrice(getProduct[0].price);
                setImagebase64(getProduct[0].imageBase64);
                setClientname(getCustomerLoggedIn.result.fullname);
                setAddress(getCustomerLoggedIn.result.address);
                setEmail(getCustomerLoggedIn.result.email);
                setNumber(getCustomerLoggedIn.result.number);
            }
        }
    },[getCustomerLoggedIn])

    const inc = () => {
        if(counter >= getProduct[0].quantity){
            setCounter(getProduct[0].quantity)
        }
        else if(counter <= getProduct[0].quantity){
            setCounter(state => state + 1)
        }
    }

    const dec = () => {
        if(counter <= getProduct[0].quantity){
            setCounter(state => state - 1)
            if(counter <= 0){
                setCounter(0)
            }
        }
    }

    const today = new Date();

    // console.log(container)

    const getHour = moment().format('h');
    const getMinutes = moment().format('mm');
    const getSeconds = moment().format('ss');
    const getFormat = moment().format('a');

    const addtocartHandler = (e) => {
        e.preventDefault();
        console.log(product_identifier,productname,price,imagebase64,quantity,clientId,clientname,address,email,number);
        dispatch(CustomerAddToCart(product_identifier,productname,price,imagebase64,quantity,clientId,clientname,address,email,number));
        setTimeout(()=> {
            history.push('/addtocart/loading')
        }, 2000)
    }

    const addtowishlistHandler = (e) => {
        e.preventDefault();
        setTransition(state => !state)
        setTimeout(() => {
            dispatch(CustomerWishlist(product_identifier,productname,price,imagebase64,quantity,clientId,clientname,address,email,number))
            history.push('/wishlist/loading');
        }, 2000);
    }

    const createAcc = (e) => {
        e.preventDefault();
        history.push('/signup');
    }

    return (
        <div className={ID}>
            <div className='innerDiv-1'>
                <div className='ProductViewContainer-1'>
                    {getProduct && getProduct.map(prod => {
                        return (
                            <img src={prod.imageBase64} key={prod._id} className='img'/>
                        )
                    })}
                </div>
                <div className='ProductViewContainer-2'>
                    {getProduct && Object.keys(getProduct).map((key) => {
                        return (
                            <div className='innerProductViewContainer-2' key={getProduct[key]._id}>
                                <div className='ProductTitleContainer'>
                                    <span className='titletxt'>
                                        {getProduct[key].productname}
                                    </span>
                                </div>
                                <div className='ProductPriceContainer'>
                                    <span className='pricetxt'>
                                        Php {getProduct[key].price}
                                    </span>
                                    <form onSubmit={addtowishlistHandler}>
                                    <button className='AddToWishlistBtn'
                                        type='submit'
                                    >
                                        Add to wishlist <FaHeart className='icon'/>
                                    </button>
                                    </form>
                                </div>
                                <div className='ProductDescriptionContainer'>
                                   <div className='DescriptionContainer'>
                                        <span className='descriptiontext'>
                                            {getProduct[key].description}
                                        </span>
                                   </div>
                                </div>
                                <div className='ProductMiniImgContainer'>
                                    <div className='imgContainer' style={{
                                        backgroundImage: `url(${getProduct[key].imageBase64})`
                                    }}/>
                                    {/* <div className='SpecsContainer'>
                                        <span className='specstext'>
                                            {getProduct[key].specs}
                                        </span>
                                    </div> */}
                                </div>
                                <div className='ProductOrderQuantity'>
                                   <div className='counterContainer'>
                                       <button className='decrement' onClick={dec}>
                                            <FaMinus className='icon'/>
                                       </button>
                                        <div className='counter'>
                                            {counter}
                                        </div>
                                       <button className='increment' onClick={inc}>
                                           <FaPlus className='icon'/>
                                       </button>
                                    </div>
                                    <div className='quantityCountContainer'>
                                        Total units {getProduct[key].quantity}
                                    </div>
                                </div>
                                <div className='addtocartBtnContainer'>
                                    <div className='ToggleContainerbtn'>
                                        <div className='textContainer'>
                                            Available
                                        </div>
                                        <div className='toggleSwitchIcon'>
                                            <FaCartPlus className='icon'/>
                                        </div>
                                      
                                            {getCustomerLoggedIn ? (
                                                <form onSubmit={addtocartHandler}>
                                                    <button className='addtoCartFunctionBtn'
                                                    onClick={()=> {
                                                        setTransition(state => !state)
                                                    }}
                                                    type='submit'
                                                    >
                                                    <span className='text'>
                                                        Add to cart
                                                    </span>
                                                    </button>
                                                </form>
                                            ):(
                                                <form onSubmit={createAcc}>
                                                    <button className='addtoCartFunctionBtn'
                                                    type='submit'
                                                    >
                                                    <span className='text'>
                                                        Create Account
                                                    </span>
                                                    </button>
                                                </form>
                                            )
                                            }
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='innerDiv-2'>
                <div className='SpecsContainer'>
                    <span className='text'>
                        Specification
                    </span>
                </div>
                <div className='SpecsInfoContainer'>
                    <div className='textContainer'>
                        {getProduct && Object.keys(getProduct).map((state => {
                           return (
                               <ul className='text' key={getProduct[state]._id}>
                                   {getProduct[state].specs}
                               </ul>
                           )
                        }))}
                    </div>
                </div>
                <div className='WarrantyContainer'>
                    <span className='text'>
                        Warranty period
                    </span>
                </div>
                <div className='WarrantyInfoContainer'>
                    <div className='textContainer'>
                       <ul className='text'>
                            1 Week replacement no refund.
                       </ul>
                    </div>
                </div>
            </div>

            <div className='innerDiv-4'>
                <div className='categoryContainer'>
                    <span className='txt'>Other related products</span>
                </div>

                <div className='productsContainer'>
                    {container && Object.keys(container).map(i => {
                        return (
                            <div className='productInnerContainer-1' key={i}>
                                {container[i].filter(val => {
                                    console.log(val.productname) // object
                                    // filter the objects val
                                    if(val.categoryfilter.toLowerCase().includes(getProduct[0].categoryfilter.toLowerCase())){
                                        return val;
                                    }
                                    }).map(state => {
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
                                    })
                                }
                            </div>
                        )
                    })}
                </div>

            </div>

            <div className='innerDiv-3'
            style={{
                backgroundImage: `url(${changeBG})`
            }}
            >
                <div className='hoverBtnContaioner'
                onMouseEnter={()=> {
                    setQuoteText(quotesArr[1])
                    setChangeBG(unsplash_4)
                }}
                onMouseLeave={()=> {
                    setQuoteText(quotesArr[0])
                    setChangeBG(unsplash_1)
                }}
                >
                    <div className='titleContainer'>
                        <span className='title'>
                            Innovation
                        </span>
                    </div>
                    <div className='contentContainer'>
                        <span className='contentText'>
                            {quoteText}
                        </span>
                    </div>
                </div>
            </div>

            <div className='innerDiv-5'>
                <div className='imgContainer'>
                    <div className='innerImgContainer'
                    style={{
                        backgroundImage: `url(${unsplash_8})`
                    }}/>
                </div>
                <div className='contextContainer'>
                    <div className='innerContextContainer-1'>
                        <div className='titleContainer'>
                            <h2 className='title'>
                                Inspired for/by society.
                            </h2>
                        </div>
                        <div className='textContainer'>
                            <span className='text'>
                            Our passion is security. And goldenwell is pure passion. We've gathered known
                            security products into one store. Every moments and memories will be shared to love ones.
                            </span>
                        </div>
                    </div>
                    <div className='innerContextContainer-2'>
                        <button className='AboutUsImgContainer'
                        // insert onClick for history.push to about us
                        >
                            <div style={{
                                backgroundImage: `url(${unsplash_3})`
                            }} className='img'>
                                <div className='dateContainer'>
                                    <span className='text'>
                                        {calendar[today.getMonth()]} {today.getDate()} {today.getFullYear()}
                                    </span>
                                </div>
                                <div className='timeContainer'>
                                    <span className='text'>
                                        {getHour + ':' + getMinutes + ':' + getSeconds + ' ' + getFormat}
                                    </span>
                                </div>
                            </div>
                            <div className='innerTextContainer'>
                                <span className='text'>
                                    About us
                                </span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Shop_Collection_View;
