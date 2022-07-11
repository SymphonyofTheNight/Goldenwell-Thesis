import React from 'react';
import { FaBars } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import logo from '../../../img/logo.png';
import remake from '../../../img/remake.png';
import '../../../scss/Shop_Navbar.scss';

const Shop_Navbar = ({ ID,setShopNavToggle, selectedProdId, setLoginToggle, setCustomerMenuToggle }) => {

    const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('Client')));

    const ifIpadBelow = window.matchMedia('(max-width: 768px)');
    const ifPhoneBelow = window.matchMedia('(max-width: 418px)');

    const history = useHistory();

    React.useEffect(()=> {
        // if(user) return localStorage.clear();
    },[])

    const navTrigger = () => {
        setLoginToggle(toggle => !toggle)
    }

    const goCollections = () => {
        history.push('/collections/all');
    }

    return (
        <div className={ID}>
            <div className='LogoContainer'>
                <button className='btnLogo' onClick={()=> {
                    window.scrollTo(0,0);
                    history.push('/');
                }}>
                    <img src={logo} className='logo'/>
                </button>
            </div>

             {/* if ipad below display none */}
            <div className='NavContainer'>
                <ul>
                    <li>
                        <button className='nav-btn'
                        onClick={goCollections}
                        >
                            Products
                            <div className='line'/>
                        </button>
                    </li>
                    <li>
                        <button className='nav-btn'
                        onClick={()=> {
                            window.scrollTo(0,0);
                            history.push('/mission/goldenwell');
                        }}
                        >
                            Mission
                            <div className='line'/>
                        </button>
                    </li>
                    <li>
                        <button className='nav-btn'
                        onClick={()=> {
                            window.scrollTo(0,0);
                            history.push('/about');
                        }}
                        >
                            About
                            <div className='line'/>
                        </button>
                    </li>
                </ul>
            </div>

            {/* show if ipad below */}

            {
               (ifIpadBelow.matches) ? 
                (
                    <div className='adminContainerResponsive'>
                        <button className='bars' onClick={navTrigger}>
                            <FaBars />
                        </button>
                    </div>
                ) : 
                (
                    <>
                    </>
                )
            }

            {/* show if phone below */}

            {
               (ifPhoneBelow.matches) ? 
                (
                    <div className='adminContainerResponsive'>
                        <button className='bars' onClick={navTrigger}>
                            <FaBars />
                        </button>
                    </div>
                ) : 
                (
                    <>
                    </>
                )
            }

            {/* if ipad below display none */}
            <div className='adminContainer'>
                {user ? (
                    <button className='user-btn'
                        onClick={()=> {
                            return setCustomerMenuToggle(toggle => !toggle)
                        }}
                    >
                        {/* Welcome back! */}
                        Welcome back! {user.result.username}
                    <div className='line'/>
                    </button>
                ) : (
                    <button className='user-btn'
                        onClick={()=> {
                            return setLoginToggle(toggle => !toggle)
                        }}
                    >
                        login
                    <div className='line'/>
                    </button>
                )}
            </div>
        </div>
    )
}

export default Shop_Navbar;
