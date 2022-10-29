import './topbar.css'
import logo from '../../img/logo3.png'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../context/Context';
const Topbar = () => {
    const PF ="http://localhost:4000/images/";

    const {user,dispatch} = useContext(Context);

    const handleLogout =  () =>{
        dispatch({
            type:"LOGOUT"
        });
    }
    return (
        <div className="top">
            <div className="topLeft">
               <Link to="/"> <img className='logo' src={logo} alt="" srcset="" />
               </Link>
             </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                       <Link className='link' to="/">HOME</Link> </li>
                    <li className="topListItem">
                       <Link className='link' to="/contact">CONTACT</Link> 
                        
                    </li>
                    <li className="topListItem">
                       <Link className='link' to="/about">ABOUT</Link> 
                        
                    </li>
                    <li className="topListItem">
                       <Link className='link' to="/post">POST</Link> 
                        
                    </li>
                    <li className="topListItem link"  onClick={handleLogout}>
                       {user &&"LOGOUT"}
                    </li>
                </ul>
            </div>
            <div className="topRight ">
            <i className="topSearchIcon fas fa-search"></i>
{

    user? (
        <Link to='/settings'> 
    <img className='topImg' src={PF+user.profilePic} alt="" />
    </Link>
    ):(
        <ul className="topList">
            <li className="topListItem">
                <Link className='link' to="/login">Login/Register</Link>
            </li>
           
        </ul>
    )
}
            </div>
        </div>
    );
}

export default Topbar;
