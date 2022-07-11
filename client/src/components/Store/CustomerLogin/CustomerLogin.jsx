import react from 'react';
import '../../../scss/CustomerLogin.scss';
import logo from '../../../img/logo.png';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { ClientSign } from '../../../controllers/Authentication.js';


const CustomerLogin = ({ ID, loginToggle, setLoginToggle, setGmailname, setGmailId, setGmail, gmailId, gmailname, setTransition }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [toggletosign , setToggletosign] = react.useState();
    const [glogin, setGlogin] = react.useState(true);

    const [toggleToLog, setToggleToLog] = react.useState(false);
    const [value, setValue] = react.useState();

    const [customerLogin, setCustomerLogin] = react.useState({
        username: '', password: ''
    });

    const [user, setUser] = react.useState(' ');
    const [check, setCheck] = react.useState(' ');

    const loginform = useRef();

    react.useEffect(()=> {
        if(loginToggle) {
            loginform.current.style.transform = 'translateX(0%)';
        }else {
            loginform.current.style.transform = 'translateX(100%)';
        }
    },[loginToggle])

    const HandleSubmit = (e) => {
        e.preventDefault();
        console.log(customerLogin)
        if(customerLogin.username && customerLogin.password){
            dispatch(ClientSign(customerLogin));
            // window.scrollTo(0,0);
            // window.location.reload();
            setTimeout(() => {
                window.scrollTo(0,0);
                window.location.reload();
            }, 2000);
        }
    }

    var user_find = useSelector(state => customerLogin?.password ? state?.CustomerReducer?.storage?.find(val => val?.google_id === customerLogin?.password) : null );

    const gmailsuccess = (e) => {

        console.log('login good', e.profileObj);

        setGlogin(state => !state);
        setGmailname(e.profileObj.name); 
        setGmailId(e.profileObj.googleId); //password for login
        setGmail(e.profileObj.email);

        console.log(e.profileObj.name)
        console.log(e.profileObj.googleId)

        setCustomerLogin({...customerLogin, 
            username: e.profileObj.name,
            password: e.profileObj.googleId
        })

        setToggletosign(state => !state);

    }

    console.log(user_find);

    // need to add non required schema for googleId

    react.useEffect(()=> {
        if(customerLogin.username && customerLogin.password){
            if(!user_find) return history.push('/signup')
            dispatch(ClientSign(customerLogin))
            loginform.current.style.transform = 'translateX(100%)'
            setTransition(state => !state)
            setTimeout(()=> {
                history.push('/loggingin/')
            }, 2000)
        }
    },[toggletosign])

    const gmailfailed = (e) => {
        console.log('login fail', e)
    }

    const logout = (e) => {
        console.log('logout successfully')
        localStorage.clear();
        setGlogin(state => !state)
    }
    
    return (
        <div className={ID} ref={loginform}>
            <form onSubmit={HandleSubmit}>
                <label className='labelContainer'>
                    <span className='label'>
                        LOGIN
                    </span>
                </label>
                <div className='inputContainer'>
                        <div className='usernamelabelContainer'>
                            <span className='text'>
                                username
                            </span>
                        </div>
                        <div className='usernameFormContainer'>
                            <input className='usernameInput' onChange={(e)=> setCustomerLogin({...customerLogin, username: e.target.value })} placeholder='username' type='text' autoComplete='new-password'/>
                        </div>
                        <div className='passwordlabelContainer'>
                            <span className='text'>
                                password
                            </span>
                        </div>
                        <div className='passwordFormContainer'>
                            <input className='passwordInput' onChange={(e)=> setCustomerLogin({...customerLogin, password: e.target.value })} placeholder='Password' type='password' autoComplete='none'/>
                        </div>
                </div>
                <div className='forgotpasswordContainer'>
                    <button className='forgotpassbtn'>
                        <span className='text'>
                            Forgot password ?
                        </span>
                    </button>
                    <button className='signupbtn'
                        onClick={()=> {
                            return history.push('/signup')
                        }}
                    >
                        <span className='text'>
                            Sign up
                        </span>
                    </button>
                </div>
                <div className='submitbtnContainer'>
                    <button className='submitbtn' type='submit'>
                        SUBMIT
                    </button>
                    <button className='cancelbtn'
                    onClick={()=> {
                        setLoginToggle(toggle => !toggle)
                    }}
                    >
                        BACK
                    </button>
                </div>
            </form>
                <div className='submitbtnContainer-2'>
                    {glogin && 
                        <GoogleLogin
                            clientId="948073970695-foccnm4ivmf52mgqbvmj629qs0fcub58.apps.googleusercontent.com"
                            buttonText="Gmail Login"
                            render={(renderProps) => {
                                return <button className='gmaillogin' onClick={renderProps.onClick}>GMAIL LOGIN</button>
                            }}
                            onSuccess={gmailsuccess}
                            onFailure={gmailfailed}
                            className='gmaillogin'
                            cookiePolicy={'single_host_origin'}
                        />
                    }
                    {!glogin && 
                        <GoogleLogout
                            clientId="948073970695-foccnm4ivmf52mgqbvmj629qs0fcub58.apps.googleusercontent.com"
                            buttonText="Logout"
                            render={(renderProps) => {
                                return <button className='gmaillogin' onClick={renderProps.onClick}>LOG OUT</button>
                            }}
                            className='gmaillogin'
                            onLogoutSuccess={logout}
                        />
                    }
                </div>
                <div className='footer'>
                    <img src={logo} className='img'/>
                </div>
        </div>
    )
}

export default CustomerLogin;