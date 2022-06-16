import React from 'react';
import '../../../scss/AdminSettings.scss';

const AdminSetting = ({ ID }) => {

    const [input, setInput] = React.useState({
        username: '', password: '', 
    })

  return (
    <div className={ID}>
        <div className='coverContainer'>
            <div className='labelContainer'>
                <span className='text'>
                    Admin Settings
                </span>
            </div>
            <div className='inputContainer'>
                <div className='labelContainer'>
                    <div className='usernameLabel'>
                        <span className='text'>
                            Username
                        </span>
                    </div>
                    <div className='passwordLabel'>
                        <span className='text'>
                            Password
                        </span>
                    </div>
                </div>
                <div className='inputFormContainer'>
                    <div className='usernameLabel'>
                        <div className='FormContainer'>
                            <input className='usernameTextForm' type='text' onChange={(e)=> {
                                setInput({...input, 
                                    username: e.target.value
                                })
                            }}/>
                        </div>
                        <button className='EditBtn'>
                            EDIT
                        </button>
                    </div>
                    <div className='passwordLabel'>
                        <div className='FormContainer'>
                            <input className='passwordTextForm' type='text' onChange={(e)=> {
                                setInput({...input, 
                                    password: e.target.value
                                })
                            }}/>
                        </div>
                        <button className='EditBtn'>
                            EDIT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )

}

export default AdminSetting;