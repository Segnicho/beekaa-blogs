import './home.css'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import {useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';
function Home() {
  const {search}  = useLocation()
  const api = 'http://127.0.0.1:4000/api'
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    const fetchPost = async () =>{
      const res =await axios.get(`${api}/posts`+search);
      console.log(res.data)
      setPosts(res.data)
    }
    fetchPost();
  },[search])


  return (
    <>
        <Header />
        <div className="home">
          <Posts posts = {posts} />
          <Sidebar />
        </div>
    </>
  )
}

export default Home