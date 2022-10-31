import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { LoginFailure, LoginSuccess, UpdateFailure, UpdateStart, UpdateSuccess } from "../../context/Actions";

export default function Settings() {
  const api = 'http://127.0.0.1:4000/api';
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:4000/images/"

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(UpdateStart());
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post(`${api}/upload`,data); 

        // await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res =  await axios.put(`${api}/users/${user._id}`,updatedUser);        

      // const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch(UpdateSuccess(res.data));
    } catch (err) {
      dispatch(UpdateFailure());
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF+user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}




// import axios from 'axios';
// import { useContext, useState } from 'react'
// import Sidebar from '../../components/sidebar/Sidebar'
// import { Context } from '../../context/Context'
// import './settings.css'

// function Settings() {
//   const {user} = useContext(Context);
//   const api = 'http://127.0.0.1:4000/api';
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [succcess, setSuccess] = useState(false);
//   const [file, setFile] = useState(null);
//   const PF = "http://localhost:4000/images/"


//   const handleSubmit = async (e)=>{
//     // console.log(user.username);
//     // console.log(user.email);
//     e.preventDefault();
//     const updatedUser = {
//       userId:user._id,
//       username,
//     email,
//     password};
//     if (file){
//       const data =new FormData();
//       const filename = Date.now() + file.name;
//       data.append("name",filename);
//       data.append("file",file);
//       updatedUser.profilePic = filename;
//       try {
//         await axios.post(`${api}/upload`,data); 
//         console.log(data);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//       try {
//        await axios.put(`${api}/users/${user._id}`,updatedUser);        
//        console.log(user.username);
//        console.log(user.email);
//        setSuccess(true);       
//       //  window.location.reload(

//       //  );       
//       } catch (err) {
        
//       }
      
    
//     } 


//   return (
//     <div className='settings'>
//       <div className="settingsWrapper">
//         <div className="settingsTitle">
//           <span className="settingsUpdateTitle">
//             Update PP
//           </span>
//           <span className="settingsDeleteTitle">
//             Delete PP
//           </span>
//         </div>
//         <form  className="settingsForm" onSubmit={handleSubmit}>
//           <label htmlFor="">profile picture</label>
//           <div className="settingsPP">
//           <img
//               src={file ? URL.createObjectURL(file) : PF+user.profilePic}
//               alt=""
//             />
//           <label htmlFor="fileInput">
//             <i className='settingsPPIcon far fa-user-circle'></i>
//           </label>
//           <input type="file" id='fileInput' style={{display:"none"}} />
//           </div>
//           <label>Username</label> 
//         <input 
//         type="text"  
//         placeholder={user.username} 
//         onChange={(e)=>setUsername(e.target.value)}
//         />
//           <label>Email</label>
//         <input type="email"  
//         placeholder={user.email}  
//         onChange={(e)=>setEmail(e.target.value)} 
//         />
//           <label>password</label>
//         <input type="password"   
//          onChange={(e) => setPassword(e.target.value)}
//         />
//         <button className="settingsSubmit" type='submit'>Update</button>
//         {
//           succcess&& (
//             <span
//               style={{ color: "green", textAlign: "center", marginTop: "20px" }}
//             >
//               Profile has been updated...
//             </span>
//           )
//         }
//         </form>
//       </div>
//       <Sidebar />
//     </div>
//   )
// }

// export default Settings