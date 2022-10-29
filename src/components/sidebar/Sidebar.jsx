import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './sidebar.css'
function Sidebar() {
    const [cats, setCats] = useState([]);
    const api = 'http://127.0.0.1:4000/api';

useEffect(()=>{
    const getCats = async ()=>{
        const res = await axios.get(api+'/categories');
        setCats(res.data);
    } 
        getCats()
})

   return (
    <div className='sidebar'>
        <div className="sidebarItem">
            <span className="sidebarTitle">About Us</span>
            <img className='sidebarImg' src="https://img.freepik.com/free-photo/two-beautiful-women-shopping-town_1303-16426.jpg?w=2000" alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur assumenda rem soluta in, cumque </p>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">Categories</span>
            <ul className="sidebarList">
                {cats.map((c)=>(
                    <Link className='link' to={`/?cat=${c.name}`}>
                     <li className="sidebarListItem">{c.name}</li>
                    </Link>
                ))}
            </ul>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">Social Media</span>
            <div className="sidebarSocial">
            <i className='sidebarIcon fab fa-facebook-square'></i>
            <i className='sidebarIcon fab fa-instagram-square'></i>
            <i className='sidebarIcon fab fa-pinterest-square'></i> 
            <i className='sidebarIcon fab fa-twitter-square'></i>            
           
            </div>
        </div>
    </div>
  )
}

export default Sidebar