'use client'
import React, { useEffect } from 'react'
import { signOut, useSession } from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import classNames from "classnames";
import { dScript } from '../Navbar';
import "@/app/style.css"


const Sidebar = () => {
  const session  = useSession();
  const links = [
      {label: 'SignUp', href: '/signup'},
      {label: 'Login', href: '/signin'}
  ]
  const currentPath = usePathname() || "/";
  const router = useRouter();

  useEffect(() => {
    
    const navTrigger = document.getElementById("nav-trigger");
    const sidebar = document.getElementById("sidebar");
    if (navTrigger && sidebar) {
      const handleClick = () => {
      
        navTrigger.classList.toggle("active");
        sidebar.classList.toggle("active");
      };

      navTrigger.addEventListener("click", handleClick);

      return () => {
        navTrigger.removeEventListener("click", handleClick);
      };
    }
  }, [currentPath]);
    
  useEffect(() => {
    const sidebarLinks = document.querySelectorAll("#sidebar a");
    const handleLinkClick = () => {
      const navTrigger = document.getElementById("nav-trigger");
      const sidebar = document.getElementById("sidebar");
      navTrigger?.classList.remove("active");
      sidebar?.classList.remove("active");
    };

    sidebarLinks.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });

    return () => {
      sidebarLinks.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
      });
    };
  }, [currentPath]);

  const SignOut = async () => {
    await signOut({callbackUrl: currentPath});
    
  }
  return (
    <>
    <div className="sidebar" id="sidebar">
              <Link className={`title mx-3 my-1 text-purple-700 text-2xl font-bold flex items-center lg:mb-0 lg:mt-0 ${dScript.className}`} href="/">
                      Liquid Oven
                    </Link>
                <div className="list-tabs">
                  <Link
                    className="text-white transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none lg:px-2"
                    aria-current="page"
                    href={"/recipes"}>Recipes
                  </Link>
                  
                  {session.data?.user ? <Link
                    className="text-white transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none lg:px-2"
                    aria-current="page"
                    href={"/recipes/create"}>Create Recipe
                  </Link> 
                  
                  :
                  null}

                  {session.data?.user ? <Link
                    className="text-white transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none lg:px-2"
                    aria-current="page"
                    href={"/dashboard"}>Dashboard
                  </Link> 
                  
                  :
                  null}
    
                </div>
                <div className="action">
                    
                    
                {session.data?.user ? <div className="text-purple-700 flex flex-col gap-4 items-center"> <span style={{"pointerEvents": "none"}}>{session.data?.user?.email}</span> <button onClick={SignOut} type='button' className={'logout me-3 inline-block rounded bg-purple-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none '}>Logout</button></div>  
                : 
                links.map(link => <Link key={link.href} className={classNames({
                    'hidden': link.href === currentPath,
                    'btn first:bg-transparent first:text-purple-700 border-2 border-purple-700 me-3 inline-block rounded bg-purple-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out': link.href !== currentPath,
                    'hover:scale-102 first:hover:bg-transparent transition-colors': true
                })} href={link.href}>{link.label}</Link>)}
              
                  
                </div>
            </div>
            </>
  )
}

export default Sidebar