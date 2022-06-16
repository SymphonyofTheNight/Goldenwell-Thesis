import React, { useEffect, useRef } from 'react';
import '../../../../scss/Transition.scss';

const Transition = ({ ID, transition }) => {

    const cover = useRef();

    useEffect(()=> {
        // transition 
        if(!transition){
            cover.current.style.transform = 'translateY(100%)';
        }else{
            cover.current.style.transform = 'translateY(0%)';
        }

    },[transition])
 
  return (
    <div className={ID} ref={cover}>
        
    </div>
  )
}

export default Transition;