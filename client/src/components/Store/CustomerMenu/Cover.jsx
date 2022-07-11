import React from 'react';
import '../../../scss/Cover.scss';

const Cover = ({ ID, covertoggle, setCoverToggle }) => {

    const toggleCover = React.useRef();

    const [text, setText] = React.useState('');

    React.useEffect(()=> {
        if(covertoggle) {
            toggleCover.current.style.transform = 'translateY(0)';
            setTimeout(() => {
                setCoverToggle(state => !state)
            }, 3000);
        }
    },[covertoggle])

  return (
    <div  className={ID} ref={toggleCover}>
      
    </div>
  )
}

export default Cover;