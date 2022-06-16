import { Grid,Button as Btn } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { FaToggleOn, FaToggleOff, FaBell, FaBars, FaCog } from 'react-icons/fa';
import '../../../scss/Navbar.scss';
import React from 'react'

const Navbar = ({ ID,setIsTogglemenu }) => {

    const [admin, setAdmin] = React.useState(JSON.parse(localStorage.getItem('Administrator')));
    const [phoneMedia, setPhoneMedia] = React.useState(window.matchMedia("(max-width: 428px)"));
    const [scrollY, setScrollY] = React.useState(0);

    const exampleDiv = React.useRef();

    React.useEffect(()=> {
        // get the value of window scroll Y axis 
        window.addEventListener("scroll", ()=> {
            setScrollY(window.scrollY);
        });

        // second parameter re-triggered every single value changes
    },[scrollY])

    const togglePlay = () => {
        setIsTogglemenu(toggle => !toggle)
    }

    if(!localStorage.getItem('Administrator')) return <Redirect to='/admin'/>

    return (
       <nav className={ID} ref={exampleDiv}>

            <Grid container className='container-left'>
                <Btn className='hamburger-btn' variant='text' onClick={togglePlay}>
                    <FaBars className='hamburger'/>
                </Btn>
            </Grid>

           <Grid container className='container-right'>
                <div className='inner-con-1'>
                    <Btn className='bell-btn' variant='text'>
                        <FaBell className='bell'/>
                    </Btn>
                    <Btn className='toggle-btn' variant='text'>
                        <FaToggleOn className='toggle'/>
                    </Btn> 
                </div>
                <div className='inner-con-2'>
                    <Btn className='admin-container-btn' variant='text'>
                        {phoneMedia.matches ? <FaCog className='cog'/> : <span>{admin.result.username}</span>}
                    </Btn>
                </div>
           </Grid>

       </nav>
    )
}

export default Navbar;
