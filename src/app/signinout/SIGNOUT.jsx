"use client"
import React from 'react'
import { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
const page = () => {
    const { data: session  } = useSession()

    
  
   
       
    
    if(session) {
          return <>
            
            <button onClick={() => signOut()}>Sign out</button>
          </>
        }
}

export default page
