import React from 'react'
import { useState } from 'react'
import { collection, query, where,getDoc, updateDoc, serverTimestamp,doc,setDoc, getDocs } from "firebase/firestore";  
import {db} from '../firebase'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthConext';
export const Search = () => {

  const [username,setUsername]  = useState("")
  const [user,setUser]  = useState(null)
  const [err,setErr]  = useState(false)

  const {currentUser} = useContext(AuthContext)

  const handleSearch = async() =>{
    const q = query(collection(db,"users"),where ("displayName","==",username)
    );

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
     setUser(doc.data())
    });
  } catch (err) {
    setErr(true)
  }
}  
const handleKey = e =>{
    e.code==="Enter" && handleSearch();
  };

const handleSelect = async() =>{
  const combineId  = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

  try {
    const res = await getDoc(doc(db,"chats",combineId))
    if(!res.exists()){
      await setDoc(doc(db,"chats",combineId),{messages: [] })

      await updateDoc(doc(db,"userchats",currentUser.uid),{
        [combineId+".userInfo"]:{
          uid : user.uid,
          displayName : user.displayName,
          photoURL : user.photoURL
        },
        [combineId+".date"]: serverTimestamp()
      });

      await updateDoc(doc(db,"userchats",user.uid),{
        [combineId+"userInfo"]:{
          uid : currentUser.id,
          displayName : currentUser.displayName,
          photoURL :currentUser.photoURL
        },
        [combineId+".date"]: serverTimestamp()
      });
    }
  } catch (err) {
    
  }
  setUser(null);
  setUsername("");
}



  return (
   <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Find a user' onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)}
        value={username}/>
      </div>
      {err && <span>User not Found</span>}
      {user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />

        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}
