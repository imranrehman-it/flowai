import React from 'react'
import { signOut } from 'next-auth/react'



export const SignOut = () => {
  return (
    <button className='text-xs text-red-500 ' onClick={()=>signOut()}>Logout</button>
  )
}

