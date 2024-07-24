import React from 'react'
import { signOut } from 'next-auth/react'
import { TbLogout } from "react-icons/tb";



export const SignOut = () => {
  return (
    <TbLogout className='text-sm text-red-500 font-bold cursor-pointer' onClick={()=>signOut()}/>
  )
}

