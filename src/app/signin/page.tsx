'use client';
import { Callout } from '@radix-ui/themes';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../components/ErrorMessage';
import "@/app/style.css";
interface SignInForm {
  email: string;
  password: string;
}

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const {handleSubmit, formState: {errors}} = useForm<SignInForm>();
  const router = useRouter();

  useEffect(() => {
    // Check if there's a success message in the session storage
    const storedSuccessMessage = sessionStorage.getItem('successMessage');
    
    if (storedSuccessMessage) {
      
      // Remove the success message from the session storage after reading it
      sessionStorage.removeItem('successMessage');
      setSuccess(storedSuccessMessage);
    }
  }, []);
  const SubmitForm = handleSubmit(async () => {

    
    try {
      setSubmitting(true);
      const result = await signIn('credentials', {email, password, redirect: false})

      if (result?.error) {
        setError('Invalid user details. Try again');
      } else {
        setSuccess("User SignIn successful")
        router.push('/dashboard/');
      }
    } catch (error) {
      setError('Invalid user details. Try again')
      alert("hello")
    } finally {
      setSubmitting(false);
    }

  })

  //Add TImeout for Error Message
  useEffect(() => {
    
    const clearErrorTimeout = setTimeout(() => {
      setError('');
      setSuccess('')
    }, 8000); 
    return () => {
      clearTimeout(clearErrorTimeout);
    };
  }, [error]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    SubmitForm();
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-200">
              Sign in to your account
            </h2>
          </div>
          
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          
            <div className="error-messages h-fit">
            {error && <div className="error-message fadeOut">
                  <p>{error}</p>
              </div>}
            {success && <div className="success-message fadeOut">
                <p>{success}</p>
            </div>}
            </div>
            <form className="space-y-6" onSubmit={handleFormSubmit}  method="POST">
            
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-700 sm:text-sm sm:leading-6"
                  />
                </div>
                <ErrorMessage>{errors.email?.message}</ErrorMessage>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                    Password
                  </label>
                  <div className="text-sm">
                    <Link href={"/forgot-password"} className="font-semibold text-purple-700 hover:text-purple-500">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-700 sm:text-sm sm:leading-6"
                  />
                </div>
                <ErrorMessage>{errors.password?.message}</ErrorMessage>
              </div>

              <div>
                <button
                type='submit'
                  
                  disabled={!email || !password}
                  className="flex w-full justify-center cursor-pointer rounded-md bg-purple-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
              Not a member?{' '}
              <button onClick={() => router.push('signup')}  className="font-semibold leading-6 text-purple-700 hover:text-purple-500">
                Sign Up
              </button>
            </p>
          </div>
      </div>
    </>
  )
}
