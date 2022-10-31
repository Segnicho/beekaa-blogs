import { Link } from 'react-router-dom'
import './post.css'
function Post({post}) {
    const PF ="http://localhost:4000/images/";
    return (
    <div  className='post'>

        {post.photo&& 
        <img className='postImg' src={PF+post.photo} alt="" />
        
        }

        <div className="postInfo">
            <div className="postCats">
                {
                    post.categories.map((c)=>(
                        <span className="postCat">{c.name}</span>
                    ))
                }
            </div>
            <Link className="link" to={`posts/${post._id}`}>
            <span className="postTitle">
            {post.title}
            </span> </Link>
          
            <hr />
        </div>
        <p className="postDesc">
            {post.desc}
        </p>
        <span className="postDate">{new Date (post.createdAt).toDateString()}</span>
    </div>
  )
}

export default Post