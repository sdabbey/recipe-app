"use client"
import React, { useEffect } from 'react'
import { GiChickenOven } from "react-icons/gi";
import { BiBookOpen, BiHeart, BiHome, BiLogOut, BiPlus, BiSearch, BiTime, BiUser } from "react-icons/bi";
import { CiMenuFries } from "react-icons/ci"
import { dScript } from '../Navbar';
import Layout from '../layout';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
const Dashboard = () => {

    const session = useSession();
    useEffect(() => {
      let btn = document.querySelector('#btn');
      let sidemenu = document.getElementById('sidemenu');
      let searchBtn = document.querySelector('#search-btn');

      if (sidemenu && btn) {
        const handleClick = () => {
        
          sidemenu?.classList.toggle("active");
          
        };
  
        btn.addEventListener("click", handleClick);
        return () => {
          btn?.removeEventListener("click", handleClick);
        };
      }


      if (searchBtn && sidemenu) {
        const handleClick = () => {
        
          sidemenu?.classList.toggle("active");
          
        };
  
        searchBtn.addEventListener("click", handleClick);
        return () => {
          searchBtn?.removeEventListener("click", handleClick);
        };
      }
      
      
      searchBtn?.addEventListener("click", () => {
        sidemenu?.classList.toggle('active')
      })
    }, [])
        
    
  return (
   
      <>
      <div className="sidemenu" id='sidemenu'>
        <div className="logo_content">
            {/* <div className="logo">
                <GiChickenOven className='logo-icon'/>
                <div className="logo_name">FlavourFuse</div>
            </div> */}

            <CiMenuFries id='btn' />
        </div>
        <ul className="nav_list">
            <li>
                <form>
                    <BiSearch id='search-btn' className='sidemenu-icon' />
                    <input type="text" placeholder="Search..." />
                </form>
                <span className="tooltip">Search</span>
            </li>
            <li>
                <Link href="/">
                    <BiHome className='sidemenu-icon'/>
                    <span className="links_name">Home</span>
                </Link>
                <span className="tooltip">Home</span>
            </li>
            
            <li>
                <a href="/dashboard/myrecipes/">
                    <BiBookOpen className='sidemenu-icon' />
                    <span className="links_name">My Recipes</span>
                </a>
                <span className="tooltip">My Recipes</span>
            </li>
           
            <li>
                <a href="#">
                    <BiHeart className='sidemenu-icon' />
                    <span className="links_name">Saved</span>
                </a>
                <span className="tooltip">Saved</span>
            </li>

             <li>
                <a href="#">
                    <BiUser className='sidemenu-icon' />
                    <span className="links_name">User</span>
                </a>
                <span className="tooltip">User</span>
            </li>
        </ul>
        <div className="profile_content">
            <div className="profile">
                <div className="profile_details">
                   {/* <img src="salad.jpg" alt=""> */}
                    <div className="name_job">
                        {/* <div className="name">
                            Yung Hydrus
                        </div> */}
                        <div className="job">
                            {session?.data?.user?.email}
                        </div>
                        
                    </div>
                    
                </div>
                <button onClick={() => signOut()} id="log_out"><BiLogOut className='sidemenu-icon' /></button>
            </div>
        </div>
      </div>
      <div className="main-page">
          <h1 className={`logo text-purple-700 ${dScript.className}`}><GiChickenOven className='logo-icon'/>FlavourFuse</h1>
          <ul className="btn-tabs-container">
              <li>
                  <Link href="/recipes/create/" className="btn">Add Recipe <BiPlus className="tab-icon"/></Link>
              </li>
              <li>
                  <Link href="/dashboard/myrecipes/" className="btn">My Recipes <BiBookOpen className="tab-icon"/></Link>
              </li>
              <li>
                  <Link href="#" className="btn">Search <BiSearch className="tab-icon"/></Link>
              </li>
              <li>
                  <Link href="#" className="btn">Favourites <BiHeart className="tab-icon"/></Link>
              </li>
              <li>
                  <Link href="#" className="btn">Recent Recipes <BiTime className="tab-icon"/></Link>
              </li>

          </ul>
      </div>
      </>
   
   
  )
}

export default Dashboard