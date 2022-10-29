import axios from 'axios';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './register.css'

function Register() {
  const api = 'http://127.0.0.1:4000/api';
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [confirmP, setConfrirmP] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e)=>{
try {
  
  e.preventDefault();
  const res = await axios.post(`${api}/auth/register`,{
    username,email,password
  });
res.data&&window.location.replace('/login');

} catch (err) {
  setError(true)
}

  
    
  }

  return (
    <div className='register'>
    <span className="registerTitle">Register</span>
    <form className="registerForm" onSubmit={handleSubmit}>
        <label >Username</label>
        <input className='registerInput' type="text" placeholder='enter your username...'
        onChange={e=>setUsername(e.target.value)}
        />
        <label >Email</label>
        <input className='registerInput' type="email" placeholder='enter your email...'
        onChange={e=>setEmail(e.target.value)}
        />
        <label >Password</label>
        <input className='registerInput' type="password" placeholder='enter your password...'
        onChange={e=>setPassWord(e.target.value)}
        
        />
        <label >Confirm Password</label>
        <input className='registerInput' type="password" placeholder='Confirm your password...'
        onChange={e=>setConfrirmP(e.target.value)}
        
        />
        <button className="registerButton">register</button>
    </form>
    <button className="registerLoginButton">
    <Link className='link' to='/login'>LOGIN</Link>
      
    </button>

</div>
  )
}

export default Register