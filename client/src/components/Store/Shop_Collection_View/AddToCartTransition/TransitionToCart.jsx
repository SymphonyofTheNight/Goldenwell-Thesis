import { useRef, useState } from "react";
import React from 'react';
import { useHistory } from 'react-router-dom';
import '../../../../scss/TransitionToCart.scss';

const TransitionToCart = ({ setTransition }) => {

    const history = useHistory();

    const text = useRef();
    const cover = useRef();

    const [textCon, setTextCon] = useState('Adding to cart...');

    React.useEffect(()=> {
        text.current.style.opacity = '1'
        setTimeout(()=> {
            setTextCon('Done');
            setTimeout(()=> {
                setTextCon('Redirecting');
                cover.current.style.filter = 'blur(10px)';
                cover.current.style.opacity = '0'
                setTransition(state => !state)
                setTimeout(()=> {
                    history.push('/');
                    window.location.reload();
                }, 3750)
            }, 2500)
        }, 2250)
    },[])

  return (
    <div className='CartTransition' ref={cover}>
        <span className='text' ref={text}>
            {textCon}
        </span>
    </div>
  )
}

export default TransitionToCart;