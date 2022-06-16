import React from 'react';
import '../../../scss/AdminSettings.scss';
import { AdminEditPassword } from '../../../api/api.js';

const AdminSetting = ({ ID }) => {

    // const [input, setInput] = React.useState({
    //     username: '', password: '', 
    // })

    const [getAdmin] = React.useState(JSON.parse(localStorage.getItem('Administrator')));

    const [TextPassword, setTextPassword] = React.useState(getAdmin.result.password);
    const [TextUsername, setTextUsername] = React.useState(getAdmin.result.username);
    const [show, setShow] = React.useState(true);
    const [userForm, setUserForm] = React.useState(true);
    const [passForm, setPassForm] = React.useState(false);

    const [newPass, setNewPass] = React.useState({
        oldpass: '', newpass: '', repeatpass: ''
    })

    const HandleSubmitUsername = (e) => {

    }

    const HandleSubmitPassword = (e) => {
        // need fix to check oldpass if correct but working
        if(newPass.oldpass && newPass.newpass === newPass.repeatpass) {
            AdminEditPassword(getAdmin.result._id,newPass.newpass);
        }
    }


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
                        <form onSubmit={HandleSubmitUsername}>
                            <div className='FormContainer'>
                                <input className='usernameTextForm' type='text' onChange={(e)=> {
                                    setTextUsername(e.target.value)
                                }}
                                value={TextUsername}
                                disabled='true'
                                />
                            </div>
                            <button className='EditBtn'
                                type='submit'
                            >
                                EDIT
                            </button>
                        </form>
                    </div>
                    <div className='passwordLabel'>
                        <form onSubmit={HandleSubmitPassword}>
                            <div className='FormContainer'>
                                <input className='passwordTextForm' type='password' onChange={(e)=> {
                                    setTextPassword(e.target.value)
                                }}
                                value={TextPassword}
                                disabled='true'
                                />
                            </div>
                            <button className='EditBtn'
                                type='submit'
                            >
                                EDIT
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        {/* pop up edit cover */}

        {show && 
            <div className='popupEditCover'>
                <div className='EditFormUsername'>
                    {
                        userForm ? (
                            <div className='usernameEditForm'>
                                <form onSubmit={HandleSubmitPassword}>
                                    <div className='labelContainer'>
                                        <span className='text'>
                                            NEW PASSWORD
                                        </span>
                                    </div>
                                    <div className='oldpasswordContainer'>
                                        <div className='label'>
                                            <span className='text'>
                                                OLD PASSWORD
                                            </span>
                                        </div>
                                        <div className='inputContainer'>
                                            <input className='inputForm' type='text' onChange={(e)=> {
                                                setNewPass({...newPass, 
                                                    oldpass: e.target.value 
                                                })
                                            }}/>
                                        </div>
                                    </div>
                                    <div className='newpasswordContainer'>
                                        <div className='label'>
                                            <span className='text'>
                                                NEW PASSWORD
                                            </span>
                                        </div>
                                        <div className='inputContainer'>
                                            <input className='inputForm' type='text' onChange={(e)=> {
                                                setNewPass({...newPass,
                                                    newpass: e.target.value
                                                })
                                            }}/>
                                        </div>
                                    </div>
                                    <div className='repeatpasswordContainer'>
                                        <div className='label'>
                                            <span className='text'>
                                                REPEAT PASSWORD
                                            </span>
                                        </div>
                                        <div className='inputContainer'>
                                            <input className='inputForm' type='text' onChange={(e)=> {
                                                setNewPass({...newPass, 
                                                    repeatpass: e.target.value 
                                                })
                                            }}/>
                                        </div>
                                    </div>
                                    <div className='btnContainer'>
                                        <button className='btnSubmit'>
                                            SUBMIT
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : null
                    }
                    {
                        passForm ? (
                            <div className='passwordEditForm'>

                            </div>
                        ) : null
                    }
                </div>
            </div> 
        }

    </div>
  )

}

export default AdminSetting;