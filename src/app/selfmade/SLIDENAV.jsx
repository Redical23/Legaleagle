"use client"
import React, { useRef, useState } from 'react'
import { SlMenu } from "react-icons/sl";
import { useModelContext } from '../context/Context';
import { useRouter } from 'next/navigation';

const SLIDENAV = () => {
  let [toggle, settoggle] = useState(true)
  const handletoggle = () => { settoggle(!toggle) }
  const router = useRouter();
  const { isModelOpen, setIsModelOpen, updateAvtarURL } = useModelContext();
  const crop = () => {
    setIsModelOpen(!isModelOpen);
  };

  return (
   

      <div className='nav23'>
        <div  className='nav23'>

        <a className='nav25' onClick={() => router.push("/lawyer")}>home</a>
        <a className='nav25' onClick={() => router.push("/News")}>NEWS</a>
        <a className='nav25' onClick={() => router.push("/Constitustion")}>Constitution</a>
         <a className='nav25' onClick={() => router.push("/intership")}>intership</a>
        <a className='nav25' onClick={() => router.push("/chats")}>Chats</a>
        


      </div>
     
     </div>
   

  )
}

export default SLIDENAV
