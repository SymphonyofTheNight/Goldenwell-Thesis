import React from 'react';
import '../../../scss/Adminlogin.scss';
import server from '../../../img/server.png';
import { TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { AdministratorLogin } from '../../../controllers/Authentication.js';
import { useHistory } from 'react-router-dom';

const AdminLogin = () => {

    const [sWindow, setsWindow] = React.useState(window.matchMedia("(max-width: 1366px)"));
    const [Ipad, setIpad] = React.useState(window.matchMedia("(max-width: 1024px)"));

    const dispatch = useDispatch();
    const history = useHistory();

    const [Admin, setAdmin] = React.useState({
        username: '', password: '',
    })

    const userOnChange = (e) => {
        return setAdmin({...Admin, username: e.target.value });
    }

    const passOnChange = (e) => {
        return setAdmin({...Admin, password: e.target.value });
    }

    const adminlogin = (e) => {
        e.preventDefault();
        if(Admin.username === '' && Admin.password === '') return alert('Empty input');
        if(Admin.username === '') return alert('Empty Username');
        if(Admin.password === '') return alert('Empty Password');
        if(Admin.username && Admin.password){
            dispatch(AdministratorLogin(Admin,history));
        }
    }

    console.log(Admin);

    return (
        <div className='Adminlogin col-lg-12'>
            <form onSubmit={adminlogin}>
            <div className='inner-container'>

                <div className='container-1'>
                    <img src={server} className='img'/>
                </div>

                <div className='container-2'>
                    <div className='loginContainer'>

                        <label className='labelContainer'>
                            <div className='label-1'>
                                <span className='txt'>Welcome Back :)</span>
                            </div>
                            <div className='label-2'>
                                <span className='txt'>
                                    To keep connected. Please login with administrators account.
                                </span>
                            </div>
                        </label>

                        <div className='inputContainer'>
                            <div className='UserContainer'>
                                {Ipad.matches ? 
                                <TextField 
                                className='textfield'
                                label="username"
                                inputProps={{
                                    style: {
                                        fontSize: (window.innerWidth <= 1366) ? 15 : 15,
                                        height: (window.innerWidth <= 1366) ? 15 : 11,
                                    }
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                    style: {
                                        fontSize: (window.innerWidth <= 1366) ? 16 : 16,
                                    },
                                }}
                                variant="standard"
                                onChange={userOnChange}
                                />
                                : 
                                <TextField 
                                className='textfield'
                                label="username"
                                inputProps={{
                                    style: {
                                        fontSize: 13.5,
                                        height: sWindow.matches ? 8 : 17
                                    }
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                    style: {
                                        fontSize: sWindow.matches ? 15 : 17
                                    },
                                }}
                                variant="standard"
                                onChange={userOnChange}
                                />}
                            </div>
                            <div className='PassContainer'>
                                {Ipad.matches ? 
                                <TextField 
                                 className='textfield'
                                type='password'
                                label="password" 
                                inputProps={{
                                    style: {
                                        fontSize: (window.innerWidth <= 1366) ? 15 : 15,
                                        height:  (window.innerWidth <= 1366) ? 15 : 11,
                                    }
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                    style: {
                                        fontSize: (window.innerWidth <= 1366) ? 16 : 16,
                                    },
                                }}
                                variant="standard"
                                onChange={passOnChange}
                                />
                                : 
                                <TextField 
                                 className='textfield'
                                type='password'
                                label="password" 
                                inputProps={{
                                    style: {
                                        fontSize: 13.5,
                                        height: sWindow.matches ? 8 : 15
                                    }
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                    style: {
                                        fontSize: sWindow.matches ? 15 : 17
                                    },
                                }}
                                variant="standard"
                                onChange={passOnChange}
                                />}
                            </div>
                        </div>

                        <div className='btnContainer'>
                            <button className='login-btn' type='submit'>
                                <span className='txt'>
                                        LOGIN
                                </span>
                            </button>
                        </div>

                        <div className='btn2Container'>
                            <button className='gotohome-btn'
                                onClick={()=> {
                                    history.push('/');
                                }}
                            >
                                <span className='txt'>
                                    <u>
                                        Back to home page
                                    </u>
                                </span>
                            </button>

                            <span className='devname'>MADE BY CODEBLITZ</span>

                        </div>

                    </div>
                </div>

            </div>

            {/* design */}

            <div className='circle-1'/>
            <div className='circle-2'/>
            </form>                  
        </div>
    )
}

export default AdminLogin;


///tommorow fix material UI textfield