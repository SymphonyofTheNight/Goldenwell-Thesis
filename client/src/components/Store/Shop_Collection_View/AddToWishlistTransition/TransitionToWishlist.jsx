import { useRef, useState } from "react";
import React from 'react';
import { useHistory } from 'react-router-dom';
import '../../../../scss/TransitionToWishlist.scss';

const TransitionToWishlist = ({ setTransition }) => {

    const history = useHistory();

    const text = useRef();
    const cover = useRef();

    const [textCon, setTextCon] = useState('Adding to wishlist...');

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
                }, 2750)
            }, 2500)
        }, 2250)
    },[])

  return (
    <div className='WishTransition' ref={cover}>
        <span className='text' ref={text}>
            {textCon}
        </span>
    </div>
  )
}

export default TransitionToWishlist;