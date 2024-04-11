'use client'
import Link from 'next/link'
import React from 'react'
import { Dancing_Script } from "next/font/google";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { Collapse, initTWE} from 'tw-elements'
import { signOut, useSession } from 'next-auth/react';

  

const dScript = Dancing_Script({ subsets: ["latin"] });

const Navbar = () => {
    initTWE({ Collapse });
    const session  = useSession();
    const links = [
        {label: 'SignUp', href: '/signup'},
        {label: 'Login', href: '/signin'}
    ]
    const currentPath = usePathname();
  return (
   



<nav
  className="sticky top-0 z-20 flex h-16 w-full flex-wrap items-center justify-between bg-zinc-50 py-2 shadow-dark-mild  lg:py-4"
  data-twe-navbar-ref>
  <div className="flex w-full flex-wrap items-center justify-between px-3">
    <div>
      <Link className={`mx-3 my-1 text-orange-600 text-2xl font-bold flex items-center lg:mb-0 lg:mt-0 ${dScript.className}`} href="/">
       Liquid Oven
      </Link>
    </div>

    
    <button
      className="block border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
      type="button"
      data-twe-collapse-init
      data-twe-target="#navbarSupportedContent4"
      aria-controls="navbarSupportedContent4"
      aria-expanded="false"
      aria-label="Toggle navigation">
      
      
      <span
        className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
            clip-rule="evenodd" />
        </svg>
      </span>
    </button>

   
    <div
      className="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
      id="navbarSupportedContent4"
      data-twe-collapse-item>
     
      <ul
        className="list-style-none me-auto flex flex-col ps-0 lg:mt-1 lg:flex-row"
        data-twe-navbar-nav-ref>
        
        <li
          className="my-4 mx-3 ps-2 lg:my-0 lg:pe-1 lg:ps-2"
          data-twe-nav-item-ref>
          <Link
            className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
            aria-current="page"
            href={"/recipes"} data-twe-nav-link-ref>Recipes</Link>
        </li>
      </ul>

      <div className="flex items-center px-2 ">
      {session.data?.user ? <div className="text-primary flex gap-4 items-center"> <span style={{"pointerEvents": "none"}}>{session.data?.user?.email}</span> <button onClick={() => signOut()} type='button' className={'me-3 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong'}>Logout</button></div>  
             : 
             links.map(link => <Link key={link.href} className={classNames({
                 'hidden': link.href === currentPath,
                 'first:bg-transparent first:text-primary me-3 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong': link.href !== currentPath,
                 ' hover:scale-102 first:hover:bg-transparent transition-colors': true
             })} href={link.href}>{link.label}</Link>)}
             
       
        
      </div>
    </div>
  </div>
</nav>
  )
}

export default Navbar