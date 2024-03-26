import React from 'react'
import {signIn} from "next-auth/react"

export const Google = () => {
  return (
    <button onClick={()=>signIn('google')} type="button" className="flex items-center justify-center w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-primary-600 mr-2">
        <svg className="w-5 h-5 mr-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C299.9 93.7 276.8 88 248 88c-94.3 0-172 76.5-172 172s77.7 172 172 172c74.4 0 128.5-49.9 149.3-116H248v-92h240Z"></path></svg>
        Google
    </button>
  )
}


