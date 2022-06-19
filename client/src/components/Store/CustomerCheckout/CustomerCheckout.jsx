import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import { useSelector, useDispatch } from 'react-redux';
import { AddOrderToAdmin } from '../../../controllers/Actions.js';
import Badge_2 from '../../../img/Badge_2.png';
import '../../../scss/CustomerCheckout.scss';
import remake from '../../../img/remake.png';
import { addOrderAdmin } from '../../../api/api.js';

const CustomerCheckout = ({ ID }) => {

  const ownerID = '62849974c8e9318be92b447d'; // change when new owner created

  const dispatch = useDispatch();
  const history = useHistory();
  const [customerLogged,setCustomerLogged] = React.useState(JSON.parse(localStorage.getItem('Client')));
  const getCart = useSelector(state => customerLogged ? state.CustomerReducer.storage.find(val => val._id === customerLogged.result._id ): null);
  const popContainer = useRef();
  const logopopContainer = useRef();

  const [sendEmail, setSendEmail] = React.useState(false);

  const [popToggle, setPopToggle] = React.useState(false);
  
  const [COD, setCOD] = React.useState({});

  const [number, setNumber] = React.useState(0);

  // console.log(getClient) // client get cart

  // React.useEffect(()=> {
  //   const total = getClient.map(state => {
  //     return state?.cart.flatMap(prod => {
  //         if(isNaN(prod?.price)){
  //             return;
  //         }else {
  //             return prod?.price
  //         }
  //     })
  //   })
  //     if(total[0]){
  //         let arr = total[0]
  //         let totalpay = arr.reduce((cur,prev)=> cur + prev,0);
  //         setNumber(totalpay);
  //     }

  // },[getClient]);

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

    if(getCart?.cart){
      setCOD(getCart?.cart);
    }

  },[getCart])

  // console.log(getCart)

  const cashondelivery = (e) => {
    e.preventDefault();

    addOrderAdmin(ownerID,COD);

    setPopToggle(state => !state)

    // dispatch(addOrderAdmin(ownerID,COD));
  }

  React.useEffect(()=> {
    if(popToggle) {
      popContainer.current.style.display = 'grid';
      popContainer.current.style.opacity = '1';
      setInterval(() => {
        if(logopopContainer.current){
          logopopContainer.current.style.transform = 'translateY(0)';
          logopopContainer.current.style.opacity = '1';
          setInterval(()=> {
            history.push('/');
            window.location.reload();
          }, 3000)
        }
      }, 1000);
    }
  },[popToggle])

  return (
    <div className={ID}>
        <div className='CheckoutDetailsContainer'>
            <span className='datetxt'>
                002
            </span>
  
            <div className='innerContainer1'>
              <div className='titleContainer'>
                <img src={remake} className='img'/>
              </div>
              <div className='textContainerSummary'>
                <span className='text'>
                  Summary
                </span>
              </div>
              <div className='itemContainer'>

                {getCart && getCart?.cart?.map(state => {
                  return (
                    <div className='inneritemContainer' key={state}>
                      <div className='item'>
                            <div className='productname'>
                              <span className='text'>
                                {state.productname}
                              </span>
                            </div>
                            <div className='productprice'>
                              <span className='text'>
                              ₱ {state.price}
                              </span>
                            </div>
                      </div>
                    </div>
                  )
                })}

              </div>
              <div className='totalContainer'>
                  <div className='titleContainer'>
                      <span className='text'>
                        TOTAL
                      </span>
                  </div>
                  <div className='priceContainer'>
                      <span className='text'>
                        ₱ {number}
                      </span>
                  </div>
              </div>
            </div>

            <div className='innerContainer2'>
                <div className='titleContainer'>
                    <span className='text'>
                        Payment
                    </span>
                    <img src={Badge_2} className='img'/>
                </div>
                <div className='detailsContainer'>
                  <div className='fullnameContainer'>
                      <div className='label'>
                          <span className='text'>
                            FULLNAME
                          </span>
                      </div>
                      <div className='textdetailContainer'>
                          <span className='text'>
                            {customerLogged.result.fullname}
                          </span>
                      </div>
                  </div>
                  <div className='addressContainer'>
                      <div className='label'>
                          <span className='text'>
                            ADDRESS
                          </span>
                      </div>
                      <div className='textdetailContainer'>
                          <span className='text'>
                            {customerLogged.result.address}
                          </span>
                      </div>
                  </div>
                  <div className='emailContainer'>
                      <div className='label'>
                          <span className='text'>
                            EMAIL ADDRESS
                          </span>
                      </div>
                      <div className='textdetailContainer'>
                          <span className='text'>
                            {customerLogged.result.email}
                          </span>
                      </div>
                  </div>
                  <div className='numberContainer'>
                      <div className='label'>
                          <span className='text'>
                            NUMBER
                          </span>
                      </div>
                      <div className='textdetailContainer'>
                          <span className='text'>
                            +63 {customerLogged.result.number}
                          </span>
                      </div>
                  </div>
                  <div className='topayContainer'>
                      <div className='label'>
                          <span className='text'>
                            TO PAY
                          </span>
                      </div>
                      <div className='textdetailContainer'>
                          <span className='text'>
                            ₱ {number}
                          </span>
                      </div>
                  </div>
                  <div className='paymethodsContainer'>
                    <div className='cashondeliveryContainer'>
                      <form onSubmit={cashondelivery}>
                        <button className='codbtn'
                          type='submit'
                        >
                            Cash on Delivery
                        </button>
                      </form>
                    </div>
                    <div className='paypalbtnContainer'>
                      <PayPalButton 
                        amount={number}
                        options={{
                          clientId: "AT_VPk38zRSBs4Ot9leed9DEmmGgdMp7y9CaavxzfQ57x0WwlQgGYeNBrD7y8hPpA4CVDlgdya8fqtZv",
                          currency: "PHP"
                        }}
                        onSuccess={(details,data) => {
                          alert(data);
                          setPopToggle(state => !state);
                        }}
                        onError={err => {
                          console.log(err)
                        }}
                      />
                    </div>
                  </div>
                </div>
            </div>

        </div>
        
        {/* popout */}
        <div className='popoutContainer' ref={popContainer}>
            <div className='popout' ref={logopopContainer}>
              <div className='logoContainer'>
                     <div className="wrapper"> 
                          <svg class="checkmark" 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 52 52"> <circle 
                            className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> 
                            <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                          </svg>
                      </div>
              </div>
              <div className='textContainer'>
                  <span className='text'>
                        Payment Successful
                  </span>
              </div>
            </div>
        </div>
    </div>
  )
}

export default CustomerCheckout;