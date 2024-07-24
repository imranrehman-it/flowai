/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react'
import { SignOut } from '../auth/SignOut'
import { useSession } from 'next-auth/react'
import { stat } from 'fs'
import { Session } from 'inspector'


export const ProfileInfo = () => {
    const {data: session, status} = useSession()
    const [image, setImage] = React.useState<string | null>(null)

    useEffect(()=>{
        if(status === 'authenticated'){
            setImage(session?.user?.image)
        }
    }, [status])



    return (
        <>
        {status === 'authenticated' && (
            <div className='flex items-center space-x-3'>
            <img src={image} alt="user" className='w-10 h-10 rounded-full'/>
            <div>
                <div className='flex flex-row items-center'>
                    <p className='text-sm font-bold text-white mr-4'>{session?.user?.name}</p>
                    <SignOut />
                </div>
                <p className='text-xs text-white'>{session?.user?.email}</p>
            </div>
        </div>
        )}
        </>
        
    )
}

