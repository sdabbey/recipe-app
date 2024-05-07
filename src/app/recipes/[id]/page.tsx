'use client'
import React, { useEffect, useState } from 'react'
import { auth, db, storage } from '@/app/firebase';
import { useSession } from 'next-auth/react';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "@/app/style.css"
import { ref } from 'firebase/storage';
import { PiBowlFood, PiHeart, PiShare, PiStar, PiTimer, PiTrash } from 'react-icons/pi';
import { FaRegEdit } from "react-icons/fa";
import Link from 'next/link';



const RecipeDetail = ({params}: {params: {id: string}}) => {
  
    const router = useRouter()
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [cookTime, setcookTime] = useState("");
    const [file, setFile] = useState("")
    const [userId, setuserId] = useState("")
    const session  = useSession();
    
    useEffect(() => {
        
        const getRecipeDetails = async () => {
            try {
                const recipeDoc = doc(db, 'recipes', params.id);
                const recipeSnapshot = await getDoc(recipeDoc);
                const data = recipeSnapshot.data();
                if (data) {
                    setTitle(data.title ?? "");
                    setIngredients(data.ingredients ?? "");
                    setInstructions(data.instructions ?? "");
                    setcookTime(data.cookTime ?? 0);
                    setFile(data.imageUrl ?? null);
                    setuserId(data.userId);
                }
                
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            }
        };
        getRecipeDetails();
    }, [params.id])

    //Handle Delete
    const handleDelete = async () => {
        try {
          const recipeDoc = doc(db, 'recipes', params.id);
          await deleteDoc(recipeDoc);
          router.push('/');
        } catch (error) {
          console.error('Error deleting recipe:', error);
        }
      };
    
    




   

  return (
   

<div className="recipe-detail-container">
        
<div className="recipe-first-sec">
    <div className="image-box">
    <Image src={file} width={500} height={500} alt='' />

        <span className="fav-btn">
            <PiHeart className='card-icons'/>
        </span>
    </div>
    <div className="card-content">
       
        <h3 className="recipe-title">{title}</h3>
        {session.data?.user ? <div className="action-section">
            <a href="#"><PiStar className='action-icon'/>Rate</a>
            <a href="#"><PiShare className='action-icon'/>Share</a>
            <Link href={"/recipes/" + (params.id) + "/update"}><FaRegEdit className='action-icon'/>Edit</Link>
            <button onClick={handleDelete}><PiTrash className='action-icon'/>Delete</button>
        </div> : null}
       
        <div className="more-details">
            <p className="serves">
                <PiBowlFood className='card-icons'/>
                <span>1 Bowl</span>
            </p>
            <p className="cook-time">
                <PiTimer className='card-icons'/>
                <span>Cook: {cookTime} mins</span>
            </p>
            <p className="ratings">
                <PiStar className='card-icons'/>
                <PiStar className='card-icons'/>
                <PiStar className='card-icons'/>
                <PiStar className='card-icons'/>
                <PiStar className='card-icons'/>
                
            </p>
        </div>
        <div className="meal-type-tags">
            <span>Appetizers</span>
            <span>Dinner</span>
            <span>Lunch</span>
            <span>Soup</span>
            <span>Vegetarian</span>

        </div>

        <div className="recipe-description">
            <h4>Description</h4>
            <hr/>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed quos ratione ipsa harum architecto amet, consequuntur libero officiis ea eligendi? Illum perspiciatis ipsa fuga, explicabo, at asperiores ratione aliquid mollitia molestias a, architecto ipsam aperiam.</p>
        </div>
    </div>
</div>
<div className="recipe-second-sec">
    <div className="recipe-ingredients">
        <h4>Ingredients</h4>
        <hr/>
        <div className="ingred-container">
            <span>{ingredients}</span>
            {/* <span><b className="quant">2</b> tsp acai powder</span>
            <span><b className="quant">1</b> handful blueberries</span>
            <span><b className="quant">1</b> medium banana</span>
            <span><b className="quant">3/4</b> cup almond, or milk of your choice</span> */}
        </div>
    </div>
    <div className="recipe-instructions">
        <h4>Instructions</h4>
        <hr/>
        <div className="instruct-container">
            {/* <span><b className="quant">1</b> Put all the smoothie ingredients into a blender.</span>
            <span><b className="quant">2</b> If the mixture is having trouble blending, add more Almond Milk or water</span>
            <span><b className="quant">3</b> Blend for 2-3 minutes or until the smoothie has no lumps. Pour the smoothie mixture into a bowl.</span>
            <span><b className="quant">4</b> Top with desired ingredients</span>
            <span><b className="quant">5</b> Serve and enjoy!</span> */}

            <span>{instructions}</span> 
                   
        </div>
    </div>
</div>
</div>
  )
}

export default RecipeDetail
