'use client'
import React, { useEffect, useState } from 'react'
import { auth, db, storage } from '@/app/firebase';
import { useSession } from 'next-auth/react';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { ref } from 'firebase/storage';




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
    }, [])

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
    
    



    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const recipe = doc(db, "recipes", params.id);
        await updateDoc(recipe, {
            title: title,
            ingredients: ingredients,
            instructions: instructions,
            cookTime: cookTime
        })
        router.push("/recipes");
    };

   

  return (
    <div className='flex items-center w-full justify-around h-full box-border' >
        <div className='w-2/5 p-0 box-border h-5/6 rounded-2xl border-8' >
            <Image src={file} width={500} height={500} className='rounded-2xl' alt='' style={{"width": "100%", "height": "100%", "objectFit": "cover"}}/>
        </div>
        <form onSubmit={handleSubmit} className='p-2 flex gap-1  w-2/5 box-border flex-wrap' style={{"height": "fit-content"}}>
        <h1 className="mb-3 text-center w-full box-border text-2xl">View/Update Recipe</h1>
         
            <div className='mb-1 w-full box-border border-red'>
            <span className="text-orange-600">Name of Recipe: </span>
                <input
                    className='w-full p-2 rounded'
                    type="text" value={title} 
                    onChange={e => setTitle(e.target.value)}
                    placeholder='title' 
                    required
                    disabled={!session.data?.user}
                    style={{"border": "1px solid grey"}}
                />
            </div>
            <div className='mb-1 w-full box-border'>
            <span className="text-orange-600">Ingredients: </span>
                <textarea
                    className='w-full p-2 rounded'
                    value={ingredients} 
                    onChange={e => setIngredients(e.target.value)}
                    placeholder='ingredients'
                    rows={3}
                    required 
                    disabled={!session.data?.user}
                    style={{"border": "1px solid grey"}}
                ></textarea>
            </div>
            <SimpleMDE value={instructions} 
                    className='w-8/12'
                    onChange={(newValue) => setInstructions(newValue)}
                    placeholder='Instructions'
                
                    aria-disabled={!session.data?.user}
                    />
            

            <div className='mb-2 ml-2 w-3/12 box-border'>
                <span className="text-orange-600">Cook Time: </span>
                <input
                    className='w-full p-2 rounded'
                    type="number" value={cookTime} 
                    onChange={e => setcookTime(e.target.value)}
                    placeholder='Cook Time (minutes)' 
                    required
                    disabled={!session.data?.user}
                    style={{"border": "1px solid grey"}}
                />
            </div>
            
            <button className='flex h-fit bg-primary p-2 px-4 rounded text-white'>Update</button>
            {session.data?.user ? <button onClick={handleDelete} className="flex h-fit items-center ml-6 bg-red-500 p-2 px-4 rounded text-white">
                Delete Recipe
            </button> : null}
        </form> 
    </div>
  )
}

export default RecipeDetail
