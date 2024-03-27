import Image from 'next/image';
import { signIn } from "next-auth/react";
import {Google} from '../app/components/auth/Google'
import {Github} from '../app/components/auth/Github'
import {LoginForm} from '../app/components/auth/LoginForm'
import {SignInBtn} from '../app/components/auth/SignInBtn'
import {Logo} from '../app/components/auth/Logo'
import {Heading} from '../app/components/auth/Heading'
import {ClosingTag} from '../app/components/auth/ClosingTag'




const SignInProviders = () => {
  return (
     <div className="flex justify-between mb-4">
        <Google/>
        <Github/>
    </div>
  )
}

const Form = () => {
    return (
        <form className="space-y-4 md:space-y-6" action="#">
            <LoginForm/>
            <SignInProviders/>
            <SignInBtn/>
            <ClosingTag />
        </form>
    )
}
export default function Login() {
  return (
     <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen  sm:h-screen lg:py-0">
                <Logo/>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <Heading text="Sign in to your account"/>
                        <Form/>
                    </div>
                </div>
            </div>
        </section>
  );
}




