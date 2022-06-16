import React from 'react';
import '../../../scss/About.scss';

const About = ({ ID }) => {
  return (
    <div className={ID}>
        <div className='titleContainer'>
            <span className='txt'>
                About
            </span>
        </div>

        <div className='imgContainer'>
            
        </div>

        <div className='aboutusContainer'>
            <span className='text'>
               Goldenwell CCTV (Closed-Circuit Television) and Computer Parts Trading Corp, which is under Golden Future Marketing Company. <br/>
               The said business is located on Paseo del Congreso St., Malolos, Bulacan and was established in 2015. It is very well known for 
               selling items for <br/> surveillance and security purposes such as CCTVs and NSS Solar Flood Lights. The Owner and the Manager is Mr. Dick Poe,
               he is the person who <br/> is responsible for controlling and administering the whole organization; the Assistant Manager is Ms. Emmaline Sy, 
               she assists or helps the manager in overall workflow of a workplace; the HR (Human Resource) Manager is Ms. Christina Chan, who is assign on planning, 
               supervising, and organizing the Human Resource department's activities, as well as on operating the contact between management and employees, 
               answering queries, administering contracts, and resolving workplace issues; the HR Assistant is Ms. Ailene Nolasco, she helps the HR manager and provides 
               technical support in the fields of recruiting, hiring, salary, and benefits; the OIC (Officer-In-Charge) is Mr. Herald Ramos, he sets company policies, 
               ensures that the rules are implemented, manages projects and budgets, <br/> as well as the responsibility of achieving the company's business objectives through 
               increased efficiency and profitability; the Sales Technician is <br/> Mr. Jai Castisimo, he is the person who interacts to the customers to locate the products or 
               services that best match their needs, <br/> and sales specialists may deliver or install the appropriate equipment on-site; and lastly, Ms. Mariel Uson in the position 
               of Sales Assistant, <br/> she provides direct help to customers on the sales floor.
            </span>
        </div>
    </div>
  )
}

export default About;