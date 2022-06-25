import React from 'react';
import '../../../../scss/TransitionCover.scss';

const TransitionCover = ({ approveToggle }) => {

    const cover = React.useRef();

    React.useEffect(()=> {
        if(approveToggle){
            cover.current.style.transform ='translateY(0)';
            setTimeout(() => {
                
            }, 1500);
        }
    },[approveToggle])

  return (
    <div className='TransitionCover' ref={cover}>

    </div>
  )

}

export default TransitionCover;