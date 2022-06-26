import React from 'react';
import { useHistory } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../../../scss/CustomerMenu.scss';

import logo from '../../../img/logo.png';

const CustomerMenu = ({ ID, CustomerMenuToggle, setCustomerMenuToggle, selectCategory, setSelecteCategory, setOpenmycart, setSelectContainer, setOpenmywishlist }) => {

    const [ExistingCustomer, setExistingCustomer] = React.useState();
    const container = React.useRef();
    const history = useHistory();

    React.useEffect(()=> {
        if(localStorage.getItem('Client') !== null) setExistingCustomer(JSON.parse(localStorage.getItem('Client')));
    },[])

    const toggle = () => {
       setCustomerMenuToggle(toggle => !toggle)
    }

    const logout = () => {
        localStorage.clear();
        setCustomerMenuToggle(toggle => !toggle)
        setTimeout(()=> {
            history.push('/');
            window.location.reload();
        },1000)
    }

    React.useEffect(()=> {
        if(!CustomerMenuToggle) return container.current.style.transform = 'translateX(100%)';
        container.current.style.transform = 'translateX(0%)';
    },[CustomerMenuToggle])

  return (
    <div className={ID} ref={container}> 
        <section className='CustomerLabel'>
            
            <span className='CustomerName'>
              {ExistingCustomer ? ExistingCustomer.result.fullname+'`s' + ' ' +'account' : ''}
            </span>

            <div className='settingsContainer'>
               <button className='btnCloseNav' onClick={toggle}>
                    <FaArrowLeft className='arrow'/>
               </button>
            </div>

        </section>

        <div className='clientNav'>
            <div className='navigation'>  
                <ul className='nav'>
                    <li>
                        <button className='btnNavigation'
                            onClick={()=> {
                                history.push('/user/profile/');
                                setCustomerMenuToggle(toggle => !toggle)
                            }}
                        >
                           <span className='text'>
                               Manage my account
                           </span>
                        </button>
                    </li>
                    <li>
                        <button className='btnNavigation'
                        onClick={()=> {
                            // setSelectContainer(state => !state)
                            history.push('/user/profile/orders')
                            setCustomerMenuToggle(toggle => !toggle)
                        }}>
                            <span className='text'>
                               My order
                            </span>
                        </button>
                    </li>
                    <li>
                        <button className='btnNavigation'
                            onClick={()=> {
                               setCustomerMenuToggle(toggle => !toggle)
                               setOpenmycart(state => !state)
                            }}
                        >
                            <span className='text'>
                               My Cart
                            </span>
                        </button>
                    </li>
                    <li>
                        <button className='btnNavigation'
                        onClick={()=> {
                            setCustomerMenuToggle(toggle => !toggle)
                            setOpenmywishlist(state => !state)
                        }}
                        >
                            <span className='text'>
                               Wishlist
                            </span>
                        </button>
                    </li>
                    <li>
                        <button className='btnNavigation'
                            onClick={logout}
                        >
                            <span className='text'>
                               Logout
                            </span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>

        <section className='footer'> 
            <img src={logo}  className='img'/>
        </section>
    </div>
  )
}

export default CustomerMenu;