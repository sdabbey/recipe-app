import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PiTimerFill } from "react-icons/pi";
import { Dancing_Script } from 'next/font/google';



const dScript = Dancing_Script({ subsets: ["latin"] });
interface RecipeCardProps {
    cookTime: number;
    id: string;
    imageUrl: string;
    title: string;
    description: string;
  }
  
const RecipeCard: React.FC<RecipeCardProps> = (props) => {
  return (
    <Link href={"/recipes/" + props.id}>
        <div
            className="m-2 block max-w-[18rem] rounded-lg bg-white text-surface shadow-secondary-1"
                style={{"height": "350px", "width": "280px"}}>
            <div className="relative overflow-hidden w-full h-3/5">
                <Image
                className="rounded-t-lg border-box w-full h-full object-cover"
                src={props.imageUrl}
                width={250} height={150}
                alt="" />
            </div>
            <div className="p-3">
                <h3><span className={`${dScript.className} text-orange-600 text-xl font-bold`}>{props.title}</span></h3>
                <hr />
                <p className="font-bold overflow-y-auto pt-2 flex items-center gap-1">
                    <PiTimerFill className='font-extrabold text-black'/>
                    <span className='text-xs text-slate-600'>{props.cookTime} minutes</span></p>
            </div>
        </div>
    </Link>
  )
}

export default RecipeCard