'use client'
import { CgNotes } from "react-icons/cg";
import { FaChevronCircleRight } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import "./style.css"
import { GiHand } from "react-icons/gi";



export default function Home() {
  
  return (
    <>
      <div className="flex items-center justify-center h-full pt-2 pb-0 w-full box-border" >
      <div className="landingpage">
        <div className="left-sec">
            <span className="tab flex items-center gap-2"><CgNotes className="text-purple-700" />Hot Recipes</span>
            <h3>Spicy & Delicious Cuisines.</h3>
            <p><span className="flex gap-1 items-center content-center">Hey <GiHand className="font-bold text-xl"/></span>Slide into our archives of delicious recipes in a range of intercontinental foods.</p>
            <Link href={"/recipes"} className="btn-imp flex items-center gap-2">View Some Recipes <FaChevronCircleRight className="mr-2 p-0" /></Link>
            
            <p className="text-xs">Want to create your own recipe? <Link className="text-purple-700" href={"/signup"}>sign up here</Link></p>
        </div>
        <div className="right-sec">
            <Image width={600} height={600} src={"https://firebasestorage.googleapis.com/v0/b/recipe-app-3b018.appspot.com/o/food.jpg?alt=media&token=3ef1d1e6-aa64-4ca9-b3bc-ae14c35802d6"} alt="" />
        </div>
    </div>
      </div>
    
    
   </>
  );
}


