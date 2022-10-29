import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
import './singlePost.css'

function SinglePost() {
    const PF ="http://localhost:4000/images/";
    const location = useLocation()
    const path = location.pathname.split('/')[2]
    const api = 'http://127.0.0.1:4000/api';
    const [post, setPost] = useState({});
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    const {user} = useContext(Context);

    useEffect(()=>{
        const getPost = async() =>{ 
           const res = await axios.get(api+'/posts/'+path);
           setPost(res.data);
           setTitle(res.data.title);
           setDesc(res.data.desc);
        }
        getPost();
    },[path]);

    const handleDelete = async ()=>{
        try {
            await axios.delete(`${api}/posts/${post._id}`,{
                data:{username:user.username}
            })
            window.location.replace('/')
        } catch (err) {
            
        }
    }


  const handleUpdate = async () => {
    try {
      await axios.put(`${api}/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      
    //   setUpdateMode(false)
      window.location.reload();
    } catch (err) {}
  };


  return (
    <div className='singlePost' >
        <div className="singlePostWrapper">
            {post.photo && 
            <img src={PF+post.photo} className='singlePostImg' alt=''/>
            }
            {updateMode? < input onChange={(e)=>setTitle(e.target.value)} type='text' value={title} className='singlePostTitleInput'/>:
            (<h1 className="singlePostTitle">
                {post.title}
                </h1>)
            }   

            {user.username === post.username &&
            <div className="singlePostEdit">
                <i className="singlePostIcon far fa-edit" onClick={()=>setUpdateMode(true)}></i>
                <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
            </div>
            
            }
            
            <div className="singlePostInfo">
                <span className="singlePostAuthor">
                    Author: <Link className='link' to={`/?user=${post.username}`}> <b>{post.username}</b></Link>
                </span>
                <span className="singlePostDate">{new Date (post.createdAt).toDateString()}</span>
            </div>
            {updateMode? 
            
            (<textarea  
                className='singlePostDescInput'
                value={desc} 
                onChange={(e)=>setDesc(e.target.value)}
               />
            ):
           ( (<p className='singlePostDesc'>
              {post.desc}
                </p>)
                
           )
                }

        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}

        </div>
    </div>
  )
}

export default SinglePost