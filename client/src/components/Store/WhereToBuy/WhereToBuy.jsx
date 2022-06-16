import React from 'react';
import '../../../scss/Wheretobuy.scss';

const WhereToBuy = ({ ID }) => {

    React.useEffect(()=> {
        window.scrollTo(0,0);
    },[])

  return (
    <div className={ID}>
        <div className='titleContainer'>
            <span className='txt'>
                WHERE TO <br/> BUY 
            </span>
        </div>

        <div className='contentContainer'>
            <span className='text'>
                Q. Where I can buy ? <br/>
                Good news is you can find us at philippines in bulacan. 
            </span>
        </div>
        
        <div className='contentContainer-2'>
            <span className='text'>
                PHILIPPINES
            </span>
        </div>

        <div className='contentContainer-3'>
            <span className='text'>
                ● McArthur Highway - Malolos City
            </span>
        </div>

    </div>
  )
}

export default WhereToBuy;