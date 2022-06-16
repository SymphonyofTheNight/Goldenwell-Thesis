import React from 'react';
import '../../../scss/Performance.scss';
import performanceimg1 from '../../../img/performanceimg1.jpg';

const PerformanaceAndSustainability = ({ ID }) => {

  React.useEffect(()=> {
    window.scrollTo(0,0);
  },[])

  return (
    <div className={ID}>
        <div className='titleContainer'>
            <span className='txt'>
                Performance and <br/>
                Sustainability should <br/>
                always be together.
            </span>
        </div>
        <div className='labelCategory'>
            <span className='text1'>
              TECHNOLOGY
            </span>
            <span className='text2'>
              SEPTEMBER 2021
            </span>
        </div>
        <div className='imgContainer-1'/>
        <div className='imgDescription-1'>
          <span className='text'>
              We make sure that every unit is quality and genuine using innovative materials. If we compromise on technology, we compromise on both performance and sustainability.
          </span>
        </div>
        <div className='imgDescription-2'>
          <span className='text'>
              From the very beginning goldenwell mission has been about helping establishments and household for their security needs. By this 
              we can assure their safety and live up to our collective responsiblity to protect.
          </span>
        </div>
        <div className='titleContainer-1'>
          <span className='text'>
            On Sustainability:
          </span>
        </div>
        <div className='imgDescription-3'>
          <span className='text'>
              Our products we sell is seemlessly constructed with the latest technology. IP CCTV system gives much higher resolution picture and better
              detail and functionality. 
              <br/>
              <br/>
              With the right technology and materials used, you can assure with it's sustainability.
          </span>
        </div>
        <div className='titleContainer-2'>
          <span className='text'>
            On Performance:
          </span>
        </div>
        <div className='imgDescription-4'>
          <span className='text'>
              We make sure the products we sell is on the top benchmarks. Each products we sell was from the largest companies around the world 
              and it's components is genuine and high standard. To assume it will provide and exceptional performance when it comes to security and safety measures.
          </span>
        </div>
        <div className='titleContainer-3'>
          <span className='text'>
            On Compromise:
          </span>
        </div>
        <div className='imgDescription-5'>
          <span className='text'>
              Never. We will never stop to break boundaries. We will never stop pushing forward to give safety to those in need.
          </span>
        </div>
    </div>
  )
}

export default PerformanaceAndSustainability;