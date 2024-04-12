'use client'
import Link from 'next/link'
import React from 'react'
import { Dancing_Script } from "next/font/google";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

import { signOut, useSession } from 'next-auth/react';

  

export const dScript = Dancing_Script({ subsets: ["latin"] });

const Navbar = () => {
    
    const session  = useSession();
    const links = [
        {label: 'SignUp', href: '/signup'},
        {label: 'Login', href: '/signin'}
    ]
    const currentPath = usePathname();

    const navTrigger = document.getElementById("nav-trigger")
        const sidebar = document.getElementById("sidebar")
        navTrigger?.addEventListener("click", ()=>{
            navTrigger.classList.toggle("active")
            sidebar?.classList.toggle("active")
        }) 
        
    // Add event listeners to sidebar links
    const sidebarLinks = document.querySelectorAll("#sidebar a");
    sidebarLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navTrigger?.classList.remove("active");
        sidebar?.classList.remove("active");
      });
    });


  return (
   

   <>
     <nav className="navbar">
        
    
        <div className="nav-items">
          <Link className={`nav-logo mx-3 my-1 text-orange-600 text-2xl font-bold flex items-center lg:mb-0 lg:mt-0 ${dScript.className}`} href="/">
            Liquid Oven
          </Link>
            
          <li className='nav-item'>
              <Link
                className="text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none lg:px-2"
                aria-current="page"
                href={"/recipes"}>Recipes</Link>
          </li>
        </div>
        <div className="action">
        {session.data?.user ? <div className="text-primary flex gap-4 items-center"> <span style={{"pointerEvents": "none"}}>{session.data?.user?.email}</span> <button onClick={() => signOut()} type='button' className={'me-3 inline-block rounded bg-orange-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none '}>Logout</button></div>  
             : 
             links.map(link => <Link key={link.href} className={classNames({
                 'hidden': link.href === currentPath,
                 'btn first:bg-transparent first:text-primary me-3 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none': link.href !== currentPath,
                 ' hover:scale-102 first:hover:bg-transparent transition-colors': true
             })} href={link.href}>{link.label}</Link>)}
              
        </div>

        <div className="nav-trigger" id="nav-trigger">
            <span></span>
            <span></span>
            <span></span>
        </div>

    </nav>

   
   </>
   

  )
}

export default Navbar