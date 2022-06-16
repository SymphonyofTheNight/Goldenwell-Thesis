import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRef } from 'react';
import '../../../scss/TransitionToLogin.scss';

const TransitionToLogin = ({ ID, setTransition, setLoginToggle }) => {

    const cover = useRef();
    const history = useHistory();

    React.useEffect(()=> {
        setTimeout(() => {
            cover.current.style.opacity = '0'
            setLoginToggle(state => !state)
            setTimeout(() => {
                setTransition(state => !state)
                history.push('/')
            }, 1000);
        }, 2000);
    },[])

  return (
    <div className={ID}
    ref={cover}
    >
        Logging In....
    </div>
  )
}

export default TransitionToLogin;