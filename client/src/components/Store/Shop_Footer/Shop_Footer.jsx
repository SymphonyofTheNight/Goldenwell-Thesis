import React from 'react';
import { FaFacebookSquare, FaYoutubeSquare, FaCopyright } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import remake from '../../../img/remake.png';
import footerCam_1 from '../../../img/footerCam_1.jpg';
import footerCam_2 from '../../../img/footerCam_2.jpg';
import '../../../scss/Shop_Footer.scss';

const Shop_Footer = ({ ID }) => {

    const history = useHistory();

    return (
        <div className={ID}>
                <div className='container-1'>

                    <div className='innerFoot-1'>
                        <span className='txt'>
                            WHAT MAKES YOU UNSECURED?
                        </span>
                    </div>

                    {/* inner foot-2 display none if tablet to phone */}

                    <div className='innerFoot-2'>
                        <div className='footerContents-1'>
                            <div className='txtContainer'>
                                Sign up for goldenwell news
                            </div>
                            <div className='IconContainer'>
                                <button className='facebookContainer'>
                                    <FaFacebookSquare className='icon'/>
                                </button>
                                <button className='youtubeContainer'>
                                    <FaYoutubeSquare className='icon'/>
                                </button>
                            </div>

                           {/* logo */}

                            <img src={remake} className='logo'/>

                        </div>

                        <div className='footerContents-2'>
                            <button className='performance'
                                onClick={()=> {
                                    history.push('/performanceandsustainability/september2021')
                                }}
                            >
                                <div className='line'/>
                                <span className='txt'>
                                    Performance and Sustainability
                                </span>
                            </button>
                            <button className='wheretobuy'
                                onClick={()=> {
                                    history.push('/wheretobuy')
                                }}
                            >
                                <div className='line'/>
                                <span className='txt'>
                                    Where to buy
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* mobile-innerfoot-2 show only when tablet to mobile*/}

                    <div className='mobile-innerfoot-2'>
                        <div className='imgContainer' />
                    </div>

                    {/* mobile-innerfoot-3 show only when tablet to mobile*/}

                    <div className='mobile-innerfoot-3'>
                        <div className='inner-mobile-innerfoot-3'>
                            <div className='mobile-innerfoot-3-container-1'>
                                <div className='categoriesContainer'>
                                    <span className='txt'>
                                        Sign up for goldenwell news
                                    </span>
                                </div>
                                <div className='logoContainer'>
                                    <button className='iconContainer-1'>
                                       <FaFacebookSquare className='FaFacebook'/>
                                    </button>
                                    <button className='iconContainer-2'>
                                        <FaYoutubeSquare className='FaYoutube' />
                                    </button>
                                </div>

                                {/* shows only on mobile version */}

                                <div className='footerNavContainer'>
                                    <button className='performance'
                                     onClick={()=> {
                                        history.push('/performanceandsustainability/september2021')
                                     }}
                                    >
                                        Performance and Sustainability
                                    </button>
                                    <button className='wheretobuy'
                                        onClick={()=> {
                                            history.push('/wheretobuy')
                                        }}
                                    >
                                        Where to buy
                                    </button>
                                </div>

                            </div>
                            <div className='mobile-innerfoot-3-container-2'>
                                <button className='mobile-performance'
                                    onClick={()=> {
                                        history.push('/performanceandsustainability/september2021')
                                    }}
                                >
                                    Performance and Sustainability
                                    <div className='line'/>
                                </button>
                                <button className='mobile-wheretobuy'
                                    onClick={()=> {
                                        history.push('/wheretobuy')
                                    }}
                                >
                                    Where to buy
                                    <div className='line'/>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                {/* container 2 display none on tablet to phone */}

                <div className='container-2'>
                    <img src={footerCam_1} className='imgContainer-1'/>
                    <img src={footerCam_2} className='imgContainer-2'/>
                </div>

                <div className='container-3'>
                    <div className='btnContainer'>
                        <button className='footerBtn'>
                        <div className='line'/>
                            Warranty 
                        </button>
                        <button className='footerBtn'>
                        <div className='line'/>
                            Refund & Return Policy
                        </button>
                        <button className='footerBtn'>
                        <div className='line'/>
                            Shipping Policy
                        </button>
                        <button className='footerBtn'>
                        <div className='line'/>
                            Terms of Service
                        </button>
                        <button className='footerBtn'>
                        <div className='line'/>
                            Privacy Policy
                        </button>
                    </div>

                    {/* copyright */}
                    
                    <button className='copyright'
                        onClick={()=> {
                            history.push('/admin')
                        }}
                    >
                        <FaCopyright className='icon'/> Goldenwell
                    </button>

                    {/* show on mobile devices */}

                    <div className='copyrightContainerMobile'>
                        <FaCopyright className='icon'/> Goldenwell
                    </div>

                </div>

            </div>

    )
}

export default Shop_Footer
