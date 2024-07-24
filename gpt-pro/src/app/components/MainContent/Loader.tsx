import React from 'react'
import { ClipLoader } from 'react-spinners'

export const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full ">
        <ClipLoader color="#fff" />
    </div>
  )
}


