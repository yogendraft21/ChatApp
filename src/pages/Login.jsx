import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import Add from '../img/addAvatar.png'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

export const Login= () => {

  const [err,setErr] = useState(false);

const navigate = useNavigate()

const handleSubmit = async (e) => {
  e.preventDefault()
  
  const email = e.target[0].value 
  const password = e.target[1].value 


try {
  await signInWithEmailAndPassword(auth, email, password)
  navigate("/")
   
} catch (err) {
  console.log(err)
  setErr(true)
}
 
}




  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className='logo'>Yogi Chat</span>
            <span className='title'>Login</span>
            <form onSubmit={handleSubmit}>
               
                <input type="email" placeholder='Email' />
                <input type="text" placeholder='Password' />
              
                <button>Sign In</button>
                {err && <span>Something went wrong  </span> }
            </form>
            <p>You do not have an account? <Link to="/register">Register</Link></p>
        </div>
    </div>
  );
}
             
