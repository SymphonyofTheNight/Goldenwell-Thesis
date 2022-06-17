import React from 'react';
import '../../../scss/AdminSettings.scss';
import bcrypt from 'bcryptjs';
import { useDispatch } from 'react-redux';
import { AdminEditPass, AdminEditUser } from '../../../controllers/Actions.js';

const AdminSetting = ({ ID }) => {

    const dispatch = useDispatch();

    const [getAdmin] = React.useState(JSON.parse(localStorage.getItem('Administrator')));

    const [TextPassword, setTextPassword] = React.useState(getAdmin.result.password);
    const [TextUsername, setTextUsername] = React.useState(getAdmin.result.username);
    const [show, setShow] = React.useState(false);
    const [userForm, setUserForm] = React.useState(false);
    const [passForm, setPassForm] = React.useState(false);

    const [Check_Hash, set_CheckHash] = React.useState();
    const [toggleTrigger, setToggleTrigger] = React.useState(false);

    const [newPass, setNewPass] = React.useState({
        oldpass: ' ', newpass: ' ', repeatpass: ' '
    })

    React.useEffect(()=> {
        bcrypt.compare(newPass.oldpass, getAdmin.result.password)
        .then(val => {
            set_CheckHash(val);
        }).catch(err => {
            console.log(err)
        })
    },[newPass.oldpass])

    const HandleSubmitUsername = (e) => {

    }

    const HandleSubmitPassword = (e) => {
        e.preventDefault();
        setToggleTrigger(state => !state);

        console.log(newPass);

        // if(newPass.newpass === newPass.repeatpass) {
        //     AdminEditPassword(getAdmin.result._id,newPass.newpass);
        //     alert('change pass confirmed!');
        // }

        if(Check_Hash){
            if(newPass.newpass === newPass.repeatpass) {
                dispatch(AdminEditPass(getAdmin.result._id,newPass.newpass));
                alert('change pass confirmed!');
                console.log(Check_Hash);
                setShow(state => !state);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        }else{
            console.log(Check_Hash);
            alert('change pass failed!');
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
                        <div className='FormContainer'>
                                <input className='passwordTextForm' type='password' onChange={(e)=> {
                                    setTextPassword(e.target.value)
                                }}
                                value={TextPassword}
                                disabled='true'
                                />
                        </div>
                        <button className='EditBtn'
                            onClick={()=> {
                                setShow(state => !state)
                                setUserForm(state => !state)
                            }}
                            type='submit'
                            >
                            EDIT
                        </button>
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
                                        <button className='btnSubmit'
                                            type='submit'
                                        >
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