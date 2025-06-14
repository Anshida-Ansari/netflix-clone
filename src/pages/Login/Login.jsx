import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png';
import { login,signup } from '../../firebase';
import netflix_spinner from '../../assets/netflix_spinner.gif';
import { toast } from 'react-toastify';

const Login = () => {

const [signState,setSignState] = useState('Sign In')
const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [loading, setLoading] = useState(false);

const validateForm = () => {
    if (signState === 'Sign Up' && name.trim() === '') {
      toast.error('Name is required');
      return false;
    }

    if (!email.trim()) {
      toast.error('Email is required');
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error('Invalid email format');
      return false;
    }

    if (!password) {
      toast.error('Password is required');
      return false;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };


const user_auth =async (event)=>{
  event.preventDefault()

   if (!validateForm()) return;
  setLoading(true)
  if(signState === 'Sign In'){
    await login(email,password)
  }else{
    await signup(name,email,password)
  }
    setLoading(false)

}


  return (
    loading?<div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === 'Sign Up'?<input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder='Your name' />:<></>}
          
          <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder='Email' />
          <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder='Password' />
          <button onClick={user_auth} type='submit'>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor=''>Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === 'Sign In'?<p>New to Netflix <span onClick={()=>{setSignState('Sign Up')}}>Sign Up Now</span></p>: <p>Alredy has an account? <span onClick={()=>{setSignState('Sign In')}}>Sign In Now</span></p>}
          
         
        </div>


      </div>
    </div>
  )
}

export default Login