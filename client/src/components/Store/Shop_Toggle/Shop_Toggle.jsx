import React from 'react';
import '../../../scss/Shop_Toggle.scss';

const Shop_Toggle = ({ ID,shopNavToggle,setShopNavToggle }) => {

    const showDiv = React.useRef();

    React.useEffect(()=> {

        if(shopNavToggle){
            showDiv.current.style.transform = 'translateX(0%)';
        }else{
            showDiv.current.style.transform = 'translateX(100%)';
        }

    },[shopNavToggle])

    return (
        <div className={ID} ref={showDiv}>
            <button onClick={()=> {
                setShopNavToggle(toggle => !toggle)
            }}>
                TOGGLE
            </button>
        </div>
    )
}

export default Shop_Toggle;
