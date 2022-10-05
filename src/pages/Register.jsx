import React from 'react'
import Add from '../img/addAvatar.png'
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth,storage,db} from '../firebase'
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate ,Link} from 'react-router-dom';

export const Register = () => {
const [err,setErr] = useState(false);

const navigate = useNavigate()

const handleSubmit = async (e) => {
  e.preventDefault()
  const displayName = e.target[0].value 
  const email = e.target[1].value 
  const password = e.target[2].value 
  const file = e.target[3].files[0] 

try {
   const res = await createUserWithEmailAndPassword(auth, email, password)



const storageRef = ref(storage, displayName);

const uploadTask = uploadBytesResumable(storageRef, file);


uploadTask.on( 
  
  (error) => {
    console.log(err)
    setErr(true)
  }, 
  () => {
  
    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      await updateProfile(res.user,{
        
        displayName,
        photoURL:downloadURL
      });
      // console.log(res)
      await setDoc(doc(db,"users", res.user.uid),{
        uid : res.user.uid,
        displayName,
        email,
        photoURL:downloadURL
      });

      await setDoc(doc(db,"userchats",res.user.uid),{});
      navigate("/");
    });
  }
);
 
} catch (err) {
  console.log(err)
  setErr(true)
}
 
}

  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className='logo'>Yogi Chat</span>
            <span className='title'>Register</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter Your Name' />
                <input type="email" placeholder='Email' />
                <input type="text" placeholder='Password' />
                <input style={{display:"none"}}type="file" id='file'/>
                <label htmlFor="file">
                    <img src={Add} alt="" />
                    <span>Add an image</span>
                </label>
                <button>Sign Up</button>
                {err && <span>Something went wrong  </span> }
            </form>
            <p>You do have an account? <Link to="/login">Login</Link></p>
        </div>
    </div>
  );
}
