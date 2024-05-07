import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PiBowlFood, PiHeart, PiStar, PiTimer, PiTimerFill } from "react-icons/pi";

import '@/app/style.css'



interface RecipeCardProps {
    cookTime: number;
    id: string;
    imageUrl: string;
    title: string;
    description: string;
  }
  
const RecipeCard: React.FC<RecipeCardProps> = (props) => {
  return (
    <Link className='recipe' href={"/recipes/" + props.id}>
     <div className="recipe-card">
            <div className="image-box">
            <Image
              
                src={props.imageUrl}
                width={250} height={150}
                alt="" />
            </div>
            <div className="card-content">
               
                <h3 className="recipe-title">{props.title}</h3>
                
                <div className="more-details">
                    <p className="serves">
                        
                        <PiBowlFood className='card-icons'/>
                        <span>1 Bowl</span>
                    </p>
                    <p className="cook-time">
                        <PiTimer className='card-icons'/>
                        <span>{props.cookTime} mins</span>
                    </p>
                    <p className="ratings">
                        <PiStar className='card-icons'/>
                        <span>5</span>
                    </p>
                </div>
                <div className="meal-type-tags">
                    <span>Appetizers</span>
                    <span>Dinner</span>
                    <span>Lunch</span>
    
                </div>
            </div>
        </div>
        
    </Link>
  )
}

export default RecipeCard