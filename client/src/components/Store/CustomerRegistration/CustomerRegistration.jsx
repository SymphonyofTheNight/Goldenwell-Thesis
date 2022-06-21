import React from 'react';
import { CustomerSignup } from '../../../controllers/Authentication.js';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import logo from '../../../img/logo.png';
import '../../../scss/CustomerRegistration.scss';

const CustomerRegistration = ({ ID, gmail, gmailname, gmailId }) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const [agreement, setAgreement] = React.useState(false);
  const [privacypolicy, setPrivacyPolicy] = React.useState(false);
  const [registration, setRegistration] = React.useState({
    fullname: '',
    address: '',
    email: '',
    google_id: 'none',
    birthday: '',
    number: '',
    gender: '',
    username: '',
    password: '',
    confirm: ''
  });

  const OnSubmitHandler = (e) => {
    e.preventDefault();
    console.log(registration)
    if(agreement && privacypolicy && registration.password === registration.confirm ){
      console.log(registration);
      console.log(privacypolicy);
      console.log(agreement);
      dispatch(CustomerSignup(registration));
      setRegistration({...registration, 
        fullname: '',
        address: '',
        email: '',
        google_id: 'none',
        birthday: '',
        number: '',
        gender: '',
        username: '',
        password: '',
        confirm: ''
      })
    }
  }

  React.useEffect(()=> {
    if(gmailId){
      setRegistration({...registration,
        google_id: gmailId ? gmailId : 'none',
        fullname: gmailname,
        email: gmail,
        password: gmailId,
        confirm: gmailId,
        username: gmailname,
      })
    }
  },[gmailId])

  // TOMMOROW FIXED EMPTY GMAIL AND NOT EMPTY GMAIL_ID ON DATABASE SCHEMA

  const RegistrationPage = <div className={ID}>

      <section className='col-lg-3'>

      </section>
      <section className='SignUpContainer'>

        <div className='headContainer'>
          <div className='logoContainer'>
            <img src={logo} className='logo'/>
          </div>
          <div className='loginContainer'>
              <span className='text'>
                Already have an account?
              </span>
              <button className='signInbtn'
                onClick={()=> {
                  history.push('/');
                  window.location.reload();
                }}
              >
                  Log in
              </button>
          </div>
        </div>

        <div className='contentContainer'>
            <div className='TextTitleContainer'>
                <span className='text'>
                    Create your account.
                </span>
            </div>
            <form onSubmit={OnSubmitHandler}>
              <section className='RegForm'>
                  <div className='FullnameInputForm'>
                    <input type='text' placeholder='Fullname' className='InputForm' 
                      value={registration.fullname}
                      onChange={(e)=> {
                        setRegistration({...registration, fullname: e.target.value })
                      }}
                    />
                  </div>
                  <div className='AddressInputForm'>
                    <input type='text' placeholder='Address' className='InputForm' 
                      onChange={(e)=> {
                        setRegistration({...registration, address: e.target.value })
                      }}
                    />
                  </div>
                  <div className='EmailAndBirthdayInputForm'>
                    <input type='text' placeholder='Email' className='InputForm' 
                      value={registration.email}
                      onChange={(e)=> {
                        setRegistration({...registration, email: e.target.value })
                      }}
                    />
                    <input type='date' className='InputForm-2'
                        onChange={(e)=> {
                          setRegistration({...registration, birthday: e.target.value })
                        }}
                    />
                  </div>
                  <div className='NumberAndGenderInputForm'>
                    <input type='text' placeholder='Number' className='InputForm' 
                      onChange={(e)=> {
                        setRegistration({...registration, number: e.target.value })
                      }}
                    />
                    <select className='InputForm' placeholder='None'
                      onChange={(e)=> {
                        setRegistration({...registration, gender: e.target.value })
                      }}
                    >
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                    </select>
                    <span className='text'>Ex: 09123456789 </span>
                  </div>
                  <div className='UsernameInputForm'>
                    <input type='text' placeholder='Username' className='InputForm' 
                      value={registration.username}
                      onChange={(e)=> {
                        setRegistration({...registration, username: e.target.value })
                      }}
                    />
                  </div>
                  <div className='PasswordInputForm'>
                    <input type='password' placeholder='Password' className='InputForm' 
                      value={registration.password}
                      onChange={(e)=> {
                        setRegistration({...registration, password: e.target.value })
                      }}
                    />
                    <input type='password' placeholder='Confirm' className='InputForm-2' 
                      value={registration.confirm}
                      onChange={(e)=> {
                        setRegistration({...registration, confirm: e.target.value })
                      }}
                    />
                    <span className='text'>
                      Min 8 or more characters and requires atleast 1 upper case and numbers.
                    </span>
                  </div>
                  <div className='aggreementContainer'>
                    <div className='agreementInnerContainer'>
                      <input type='checkbox' className='checkbox' 
                        onChange={()=> {
                          setAgreement(toggle => !toggle)
                        }}
                      /> 
                      <span className='text'>I agree to Goldenwell's Terms of Service.</span>
                    </div>
                    <div className='agreementInnerContainer-2'>
                      <input type='checkbox' className='checkbox'
                        onChange={()=> {
                          setPrivacyPolicy(toggle => !toggle)
                        }}
                      /> 
                      <span className='text'>
                        I accept Goldenwell's use of my data and everything else described in the Privacy Policy.
                      </span>
                    </div>
                  </div>
                  <div className='btnSubmitContainer'>
                      <button className='submitBtn' type='submit'>
                        Create my account
                      </button>
                  </div>
              </section>
            </form>
        </div>
      </section> 

  </div>

  return (
    <React.Fragment>
      {RegistrationPage}
    </React.Fragment>
  )

}

export default CustomerRegistration;