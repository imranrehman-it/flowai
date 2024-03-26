import React from 'react'
import Image from 'next/image'

export const Logo = () => {
  return (
    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <Image src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" width={32} height={32} className="mr-2" />
        Flowai
    </a>
  )
}

