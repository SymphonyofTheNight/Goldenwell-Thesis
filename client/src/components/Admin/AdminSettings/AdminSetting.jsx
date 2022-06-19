import React from 'react';
import '../../../scss/AdminSettings.scss';
import bcrypt from 'bcryptjs';
import { useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { AdminEditPass, AdminEditUser } from '../../../controllers/Actions.js';

const AdminSetting = ({ ID }) => {

    const dispatch = useDispatch();

    const [getAdmin] = React.useState(JSON.parse(localStorage.getItem('Administrator')));

    const [TextPassword, setTextPassword] = React.useState(getAdmin.result.password);
    const [TextUsername, setTextUsername] = React.useState(getAdmin.result.username);

    const [userForm, setUserForm] = React.useState(false);
    const [passForm, setPassForm] = React.useState(false);
    const [popout, setPopout] = React.useState(false);
    // const [logout, setLogout] = React.useState(false);
    const passcover = React.useRef();
    const textTrans = React.useRef();
    const coverLogout = React.useRef();

    const [Check_Hash, set_CheckHash] = React.useState();

    const [newPass, setNewPass] = React.useState({
        oldpass: ' ', newpass: ' ', repeatpass: ' '
    })

    const [newUser, setNewUser] = React.useState({
        newusername: '', password: '', repeatpassword: ''
    });

    React.useEffect(()=> {
        bcrypt.compare(newPass.oldpass, getAdmin.result.password)
        .then(val => {
            set_CheckHash(val);
        }).catch(err => {
            console.log(err)
        })
    },[newPass.oldpass])

    // React.useEffect(()=> {
    //     if(passForm){
    //         passcover.current.style.transform = 'translateY(0px)';
    //         passcover.current.style.opacity = '1';
    //     }
    // },[passForm])

    const HandleSubmitUsername = (e) => {
        e.preventDefault();

        if(newUser.password === newUser.repeatpassword){
            dispatch(AdminEditUser(getAdmin.result._id,newUser.newusername));
            alert('change username confirmed');
            setPopout(state => !state);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }else{
            alert('change username failed!');
            window.location.reload();
        }


    }

    const HandleSubmitPassword = (e) => {
        e.preventDefault();
        if(Check_Hash){
            if(newPass.newpass === newPass.repeatpass) {
                dispatch(AdminEditPass(getAdmin.result._id,newPass.newpass));
                alert('change pass confirmed!');
                setPopout(state => !state);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        }else{
            alert('change pass failed!');
            window.location.reload();
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
                            <div className='FormContainer'>
                                <input className='usernameTextForm' type='text' onChange={(e)=> {
                                    setTextUsername(e.target.value)
                                }}
                                value={TextUsername}
                                disabled='true'
                                />
                            </div>
                            <button className='EditBtn'
                                onClick={()=> {
                                    setPopout(state => !state)
                                    setUserForm(state => !state)
                                }}
                            >
                                EDIT
                            </button>
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
                                    setPopout(state => !state)
                                    setPassForm(state => !state)
                                }}
                            >
                            EDIT
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {
            popout && 
            <div className='popupDiv'>
                    {
                        passForm ? (
                            <div className='EditFormPassword'  ref={passcover}>
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
                        userForm ? (
                            <div className='usernameEditForm'>
                                <div className='EditFormUsername'  ref={passcover}>
                                    <form onSubmit={HandleSubmitUsername}>
                                        <div className='labelContainer'>
                                            <span className='text'>
                                                NEW USERNAME
                                            </span>
                                        </div>
                                        <div className='newUserContainer'>
                                            <div className='label'>
                                                <span className='text'>
                                                    NEW USERNAME
                                                </span>
                                            </div>
                                            <div className='inputContainer'>
                                                <input className='inputForm' type='text' onChange={(e)=> {
                                                    setNewUser({...newUser,
                                                        newusername: e.target.value 
                                                    })
                                                }}/>
                                            </div>
                                        </div>
                                        <div className='passwordContainer'>
                                            <div className='label'>
                                                <span className='text'>
                                                    PASSWORD
                                                </span>
                                            </div>
                                            <div className='inputContainer'>
                                                <input className='inputForm' type='text' onChange={(e)=> {
                                                    setNewUser({...newUser,
                                                        password: e.target.value
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
                                                    setNewUser({...newUser,
                                                        repeatpassword: e.target.value 
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
                            </div>
                        ) : null
                    }

                    {/* close btn */}

                    <button className='btnClose'
                        onClick={()=> {
                            setPopout(state => !state)
                            setPassForm(state => !state)
                        }}
                    >
                        <FaTimes className='closeLogo'/>
                    </button>

            </div>
        }

        {/* {
            autologout && 
            <div className='logout' ref={coverLogout}>
                <span className='text' ref={textTrans}> 
                    Redirecting back to login....
                </span>
            </div>
        } */}

    </div>
  )

}

export default AdminSetting;