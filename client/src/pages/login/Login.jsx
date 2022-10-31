import axios from 'axios'
import { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
import './login.css'

function Login() {
  const api = 'http://127.0.0.1:4000/api'
  const usernameRef = useRef()
  const passwordRef = useRef()
  const {dispatch, isFetching} = useContext(Context);

   const handleSubmit = async (e)=>{
     e.preventDefault();
     dispatch({
       type:"LOGIN_START"
     })
     try {
      const res = await axios.post(`${api}/auth/login`,{
        username:usernameRef.current.value
        ,password:passwordRef.current.value
      });
      dispatch({type:"LOGIN_SUCCESS", payload:res.data});
    } catch (err) {
      dispatch({type:"LOGIN_FAILURE"});
     }

  }
  
  return (
    <div className='login'>
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
            <label >Username</label>
            <input className='loginInput' type="text" placeholder='enter your username...'
            ref={usernameRef}
            />
            <label >Password</label>
            <input className='loginInput' type="password" placeholder='enter your password...'
            ref={passwordRef}
            />
            <button className="loginButton" type='submit' disabled={isFetching}> Login</button>
        </form>
        <button className="loginRegisterButton">
          <Link className='link' to='/register'>REGISTER</Link>
        </button>

    </div>
  )
}

export default Login