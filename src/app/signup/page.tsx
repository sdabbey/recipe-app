'use client'
import React, { use, useState } from 'react'
import Link from 'next/link'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { useRouter } from 'next/navigation';




const SignUpPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    
    const signUp = async (e: any) => {
      e.preventDefault();
      const { email, password, confirm_password } = e.target.elements;
      
      if (password.value !== confirm_password.value) {
        console.error("Passwords do not match");
        // You can display an error message to the user or handle the error accordingly
        return;
      }
    
      try {
        await createUserWithEmailAndPassword(auth, email.value, password.value);
        console.log("User signed up successfully!");
        router.push("/signin");
      } catch (error) {
        console.error("Error signing up:", (error as Error).message);
        // Handle the error (e.g., display an error message to the user)
      }
    };

  return (
    

<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
<div className="sm:mx-auto sm:w-full sm:max-w-sm">
 
  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
    Create an account
  </h2>
</div>

<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
  <form className="space-y-6" onSubmit={signUp}  method="POST">
    <div>
      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
        Email address
      </label>
      <div className="mt-2">
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div>
      <div className="flex items-center justify-between">
        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
          Password
        </label>
        
      </div>
      <div className="mt-2">
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div>
      <div className="flex items-center justify-between">
        <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">
          Confirm Password
        </label>
        
      </div>
      <div className="mt-2">
        <input
          id="confirm_password"
          name="confirm_password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => setPasswordAgain(e.target.value)}
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div>
      <button
       
        disabled={!email || !password || !passwordAgain}
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Sign Up
      </button>
    </div>
  </form>

  <p className="mt-10 text-center text-sm text-gray-500">
    Already a member?{' '}
    <button onClick={() => router.push('signin')}  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
      Log In
    </button>
  </p>
</div>
</div>
  )
}

export default SignUpPage