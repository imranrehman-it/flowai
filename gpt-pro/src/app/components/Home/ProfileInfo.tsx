import React, { useEffect } from 'react'
import { SignOut } from '../auth/SignOut'
import { useSession } from 'next-auth/react'
import { stat } from 'fs'
import { Session } from 'inspector'


export const ProfileInfo = () => {
    const {data: session, status} = useSession()

    useEffect(()=>{
        console.log(status)
    }, [status])



    return (
        <>
        {status === 'authenticated' && (
            <div className='flex items-center space-x-3'>
            <img src={session?.user?.image || ''} alt="user" className='w-10 h-10 rounded-full'/>
            <div>
                <p className='text-sm font-bold text-white'>{session?.user?.name}</p>
                <p className='text-xs text-white'>{session?.user?.email}</p>
                <SignOut />
            </div>
        </div>
        )}
        </>
        
    )
}

