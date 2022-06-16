import React from 'react';
import { useHistory } from 'react-router-dom';
import  missionpng2 from '../../../img/missionpng2.jpeg';
import  missionpng5 from '../../../img/missionpng5.jpg';
import '../../../scss/Mission.scss';

const Mission = ({ ID }) => {

  const history = useHistory();

  return (
    <div className={ID}>

        <div className='titleContainer'>
            <span className='txt'>
                A SIGHT <br/> FOR EVERYONES SAFETY
            </span>
        </div>

        <div className='imgContainer'/>

        <div className='imgContainer-2'>
          <div className='innerContainer-1'>
            <img src={missionpng2} className='img'/>
          </div>
          <div className='innerContainer-2'>
            <span className='text'>
                We felt that bringing protection and advance solution for your home and work security is our job.
            </span>
          </div>
        </div>

        <div className='imgContainer-3'>
            <div className='textContainer'>
              <div className='textInnerContainer-1'>
                <span className='text'>
                  We knew what people need. security to protect our love ones. <br/> So we offered safety. 
                  {/* Nothing is ever going to be unnoticed. Free your mind and protect your love ones. */}
                </span>
                <span className='text2'>
                  Nothing is ever going to be unnoticed.
                </span>
              </div>
            </div>
        </div>

        <div className='imgContainer-4'>

            <div className='innerContainer-1'>
              <div className='imgContainerInner-4'/>
            </div>

            <div className='innerContainer-2'>

              <div className='textContainer-1'>
                  <span className='txt'>
                    Sight for a better future.
                  </span>
                  <span className='txt2'>
                    Our mission is to provide the security and surveillance to protect today's generation to secure peace.
                  </span>
              </div>

              <div className='secondContainer'>
                  <button className='btnToSustain'
                    onClick={()=>{
                      history.push('/performanceandsustainability/september2021')
                    }}
                  >
                      <img src={missionpng5} className='img'/>
                      <div className='coverInnerContainer'>
                        <div className='topContainer'>
                            <div className='topInnerContainer-1'>
                              <span className='text'>
                                TECHNOLOGY
                              </span>
                            </div>
                            <div className='topInnerContainer-2'>
                              <span className='text'>
                                SEPTEMBER 2021
                              </span>
                            </div>
                        </div>
                        <div className='bottomContainer'>
                          <span className='text'>
                              PERFORMANCE AND SUSTAINABILITY
                          </span>
                        </div>
                      </div>
                  </button>
              </div>

            </div>

        </div>

        <div className='imgContainer-5'>
          <div className='imgInnerContainer1'>
            <span className='text'> 
              The Goldenwell™ has been tested and trusted for more than 6 years. And It's getting better 
              with our passion to serve and protect.
            </span>
          </div>
        </div>

        <div className='imgContainer-6'>
          <div className='innerContainer-1'>
            <span className='text'>
              Goldenwell exist because you exist. And we're ready to witness every success you will make.
            </span>
          </div>
          <div className='innerContainer-2'>
            <div className='imgContainer'/>
          </div>
        </div>

    </div>
  )
}

export default Mission;