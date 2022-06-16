import React from 'react';
import { OwnerSignup } from '../../../api/api.js';

const AdminSignup = () => {
 
    const [signup, setSignup] = React.useState({
        username: '', password: ''
    })

    const onSubmit = (e) => {
        e.preventDefault();
        OwnerSignup(signup.username,signup.password)
    }   

  return (
    <div>
        <form  onSubmit={onSubmit}>
        <input onChange={(e)=> {
            setSignup({...signup, username: e.target.value })
        }}>
        </input>
        <input onChange={(e)=> {
            setSignup({...signup, password: e.target.value })
        }}></input>
        <button
        type='submit'
        >
            signup
        </button>
        </form>
    </div>
  )
}

export default AdminSignup;