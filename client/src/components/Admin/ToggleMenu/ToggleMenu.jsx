import React from 'react';
import '../../../scss/ToggleMenu.scss';
import { FaHome, FaUser, FaDollarSign, FaTruck,FaUserTie,FaSignOutAlt,FaArrowLeft,FaShoppingBag } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

const ToggleMenu = ({ ID,isTogglemenu,setIsTogglemenu }) => {

    const menudiv = React.useRef();
    const history = useHistory();

    React.useEffect(()=> {
        if(isTogglemenu){
            menudiv.current.style.transform = 'translateX(0%)';
        }else{
            menudiv.current.style.transform = 'translateX(-110%)';
        }
    },[isTogglemenu])

    return (
        <div className={ID} ref={menudiv}>

            <div className='logoContainer'>
                <button className='toggle-btn' onClick={()=> {
                    setIsTogglemenu(toggle => !toggle)
                }}>
                   <FaArrowLeft className='logo'/>
                </button>
            </div>

            <div className='label-container'>
                <label className='label mx-4'>
                    Pages
                </label>
            </div>

            <div className='menu-container'>
                <button className='menu-btn' 
                onClick={()=> {
                    history.push('/admin/home')
                    setIsTogglemenu(toggle => !toggle)
                }}
                >
                    <div className='logo-container'>
                        <FaHome className='logo'/>
                    </div>
                    <div className='txt-container'>
                            Home
                    </div>
                </button>
                <button className='menu-btn'
                 onClick={()=> {
                    history.push('/admin/users')
                    setIsTogglemenu(toggle => !toggle)
                }}
                >
                    <div className='logo-container'>
                        <FaUser className='logo'/>
                    </div>
                    <div className='txt-container'>
                            Users 
                    </div>
                </button>
                <button className='menu-btn'
                     onClick={()=> {
                        history.push('/admin/collections/all')
                        setIsTogglemenu(toggle => !toggle)
                    }}
                >
                    <div className='logo-container'>
                        <FaShoppingBag className='logo'/>
                    </div>
                    <div className='txt-container'>
                            Products 
                    </div>
                </button>
                {/* <button className='menu-btn'>
                    <div className='logo-container'>
                        <FaDollarSign className='logo'/>
                    </div>
                    <div className='txt-container'>
                            Sales
                    </div>
                </button> */}
                <button className='menu-btn'
                    onClick={()=> {
                        history.push('/admin/deliveries')
                    }}
                >
                    <div className='logo-container'>
                        <FaTruck className='logo'/>
                    </div>
                    <div className='txt-container'>
                        Deliveries
                    </div>
                </button>
            </div>

            <div className='label-container'>
                <label className='label mx-4'>
                    Settings
                </label>
            </div>

            <div className='menu-container'>
                <button className='menu-btn'
                    onClick={()=> {
                        history.push('/admin/settings')
                        setIsTogglemenu(toggle => !toggle)
                    }}
                >
                        <div className='logo-container'>
                            <FaUserTie className='logo'/>
                        </div>
                        <div className='txt-container'>
                            Admin
                        </div>
                </button>
                <button className='menu-btn' onClick={()=> {
                    setIsTogglemenu(toggle => !toggle)
                    localStorage.clear();
                    history.push('/admin');
                }}>
                        <div className='logo-container'>
                            <FaSignOutAlt className='logo'/>
                        </div>
                        <div className='txt-container'>
                            Sign out
                        </div>
                </button>
            </div>

           <div className='credit-container'>
                <span>MADE BY CODEBLITZ</span>
           </div>

        </div>
    )
}

export default ToggleMenu;

