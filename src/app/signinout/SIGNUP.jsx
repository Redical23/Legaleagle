"use client"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { useSession, signIn } from "next-auth/react"
import { useEffect } from "react"
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation"

import React from 'react'

const SIGNUP = ({ onSignupSuccess }) => {
  const router = useRouter();
  const { data: session, status } = useSession()
  

  

  useEffect(() => {
    if (status === "authenticated" && onSignupSuccess) {
      onSignupSuccess()
    }
  }, [status, onSignupSuccess])

  if (!session)
    return <>

      <button onClick={() => signIn(Github)}>Sign in</button>

    </>
 


}

export default SIGNUP
