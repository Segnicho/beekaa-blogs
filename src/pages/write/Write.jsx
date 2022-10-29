import axios from 'axios';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import './write.css'


function Write() {
  const api = 'http://127.0.0.1:4000/api';
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const {user} = useContext(Context);

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const newPost = {username:user.username,
    title,
    desc,}
    if (file){
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name",filename);
      data.append("file",file);
      newPost.photo = filename
      try {
        await axios.post(`${api}/upload`,data);        
      } catch (err) {
      }
    }
      try {
        console.log(newPost);
        const res = await axios.post(`${api}/posts`,newPost);        
        console.log(res.data);
        window.location.replace("/posts/"+res.data._id);        
      } catch (err) {
        
      }
      
    
    } 

  
  return (
    <div className='write'>
      {
        file&&(
          <img src={URL.createObjectURL(file)} alt="" className="writeImg" />
        )
      }

        <form className='writeForm' onSubmit={handleSubmit}>
            <div className="writeFormGroup">
                <label htmlFor="fileInput">
                    <i className='writeIcon fas fa-plus'></i>
                </label>
                <input style={{display:"none"}} type="file" name="" id="fileInput"
                onChange={(e)=>setFile(e.target.files[0])}
                />
           <input className='writeInput' type="text" name="" id="" placeholder='Title...' 
           onChange={e=>setTitle(e.target.value)}
           />
           </div>

           <div className="writeFormGroup">
               <textarea placeholder='Write your story...' type='text' className='writeInput writeText'
              onChange={e=>setDesc(e.target.value)}
               
               ></textarea>
           </div>
           <button  className="writeSubmit" type='submit' >Publish</button>
        </form>
    </div>
  )
}

export default Write