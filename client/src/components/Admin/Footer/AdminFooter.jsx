import React from 'react';
import '../../../scss/Adminfooter.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCopyright } from 'react-icons/fa';

const AdminFooter = ({ ID }) => {
    return (
        <div className={ID}>
            <div className='innerContainer'>
                <div className='container-1'>
                    <FaCopyright className='logo'/>
                    <span className='txt'>&nbsp;&nbsp;2021 Goldenwell</span>
                </div>
                <div className='container-2'>
                    <span className='txt'>CODEBLITZ</span>
                </div>
            </div>
        </div>
    )
}

export default AdminFooter;
