import React from 'react';
import { useHistory } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import '../../../scss/Shop_Landing.scss';
import cctv5 from '../../../img/cctv5.jpg';
import remake from '../../../img/remake.png';
import Shop_Products from './Shop_Products/Shop_Products';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Shop_Landing = ({ ID,setSelectedProdId }) => {

    const history = useHistory();

    const [scrollY, setScrollY] = React.useState(0);
    // let footerdiv = React.useRef();
    // const largeWindow = window.matchMedia('(max-width: 1920px)');

    // const scrollTrigger = 3200;

    const heightcount = () => setScrollY(window.scrollY);

    React.useEffect(()=> {

        window.addEventListener('scroll', heightcount);

        return () => {
            window.removeEventListener('scroll', heightcount);
            console.log('cleaned up!');
        }

    },[scrollY])

    return (
        <div className={ID}>

            <div className='innerCon-1'>
                <span className='motto'>
                    WE WERE TOLD <br/>
                    YOUR SECURITY IS OUR <br/>
                    PRIORITY.
                </span>
            </div>

            <div className='innerCon-2'>

                <div className='container-1'>
                    <div className='titleContainer'>        
                        <span className='txt'>
                            Featured
                        </span>
                    </div>

                    <div className='btnContainer'>
                        <button className='product-btn'
                        onClick={()=> {
                            history.push('/collections/all');
                        }}
                        >
                            <div className='line'/>
                            <span className='txt'>
                                Discover our products <FaArrowRight className='icon'/>
                            </span>
                        </button>
                    </div>
                </div>

                <div className='productListContainer'>
                    <Shop_Products setSelectedProdId={setSelectedProdId}/>
                </div>

                {/* show on mobile only */}

                <div className='mobilebtnContainer'>
                    <button className='product-btn'>
                        <div className='line'/>
                            <span className='txt'>
                                Discover our products <FaArrowRight className='icon'/>
                            </span>
                    </button>
                </div>

            </div>

            <div className='innerCon-3'>
                <img src={cctv5} className='imgCover'/> 
                <div className='container-1'>
                    <div className='txtContainer'>
                        <span className='txt'>
                            We bring what thieves fear. <br/>
                            Greatest security.
                        </span>
                    </div> 
                    <div className='btnContainer'>
                        <button className='product-btn'>
                            <div className='line'/>
                            <span className='txt'>
                                Discover our products <FaArrowRight className='icon'/>
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <div className='innerCon-4'>
                <div className='container-1'>
                    <div className='sloganContainer'>
                        <span className='txt'>
                            We aim for timeless <br/>
                            security measures.
                        </span>
                    </div>
                    <div className='txtContainer'>
                        <span className='txt'>
                            When it comes to safety and security we provide it. Each product 
                            includes quality and high standard of a product. Our technologies 
                            continuously undergo feature refinements to improve performance in areas 
                            such as digital equipment options, data storage, component miniaturization, 
                            wireless communications and automated image analysis.
                        </span>
                    </div>
                </div>
                <div className='container-2'/>
            </div>

        </div>
    )
}

export default Shop_Landing;
