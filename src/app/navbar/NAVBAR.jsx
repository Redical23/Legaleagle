"use client"
import React from 'react'
import SLIDEBAR from '../selfmade/SLIDEBAR.JSX'
import DROPMENU from '../selfmade/DROPMENU'
import SEARCHBAR from '../selfmade/SEARCHBAR'
import { useState } from 'react'
import SIGNUP from "../signinout/SIGNUP"
import { useModelContext } from '../context/Context'


const NAVBAR = () => {
  const { isSignedUp, setIsSignedUp } = useModelContext();
  let [news, setnews] = useState(false)
  let [home, sethome] = useState(false)
  let [law, setlaw] = useState(false)
  const togglenews = () => { setnews(true); sethome(home); setlaw(law) }
  const togglelaw = () => { setnews(news); sethome(home); setlaw(!law) }
  
  const handleSignupSuccess = () => {
    setIsSignedUp(true)
    
  }
  


  return (

    <div>
      <nav className='bg-sky-500'>
        <ol className='flex justify-between'>
       
        {isSignedUp && (
            <li>
              <span>
                <SLIDEBAR togglelaw={togglelaw} togglenews={togglenews} />
              </span>
            </li>
          )}
          
          <li className={news ? "show" : "hidden"}><div><SEARCHBAR /></div></li>
          <li>
            <div><SIGNUP onSignupSuccess={handleSignupSuccess} /></div>
            
          </li>

        </ol>
      </nav>
    </div>

  )
}

export default NAVBAR
