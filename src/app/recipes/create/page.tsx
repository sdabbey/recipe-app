'use client'
import React, { useEffect, useState } from 'react'
import { auth, db, storage } from '@/app/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { getAuth, User } from 'firebase/auth';
import "@/app/style.css"
//import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';


const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });


const createRecipe = () => {
    const router = useRouter()

    const session = useSession({
        required: true,
        onUnauthenticated(){
          redirect('/signin');
        }
      })
      
    


    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [cookTime, setcookTime] = useState(0);
    const [file, setFile] = useState(null);
    
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);


    const handleImageUpload = (e:any) => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();

        if(file){
            const fileWithName = file as File;
            const storageRef = ref(storage, fileWithName.name);
            const uploadTask = uploadBytesResumable(storageRef, fileWithName);
            const auth = getAuth()
            const currentUser = auth.currentUser;
            console.log(currentUser)
            if(currentUser){
                const userId = currentUser.uid;
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = 
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log("Upload is " + progress + "% done");
                        switch (snapshot.state){
                            case "paused":
                                console.log("Upload is paused");
                                break;
                            case "running":
                                console.log("Upload is running");
                                break;
        
                        }
                    },
                    (error) => {
                        switch(error.code){
                            case "storage/unauthorized":
                                break;
                            case "storage/canceled":
                                break;
                            case "storage/unknown":
                                break;
                        }
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            console.log("File available at", downloadURL);
        
                            const recipesCollection = collection(db, "recipes");
                            const recipesSnapshot = await getDocs(recipesCollection);
                            
                                await addDoc(recipesCollection, {
                                    title: title,
                                    ingredients: ingredients,
                                    instructions: instructions,
                                    cookTime: cookTime,
                                    imageUrl: downloadURL,
                                    userId: userId
                                })
            
                            
                            setTitle("");
                            setIngredients("");
                            setInstructions("");
                            setcookTime(0);
                            setFile(null);
                            
                            router.push("/recipes")
                        });
        
                        
        
                    }
                );
            }else {
                // 'currentUser' is null, handle this case as needed
                console.error("User not authenticated.");
              }
        }else{
            console.error("No file selected")
        }

       
    };


    return (
        <div className='recipe-create-container flex items-center justify-center pt-20'>
           <form onSubmit={handleSubmit} className='p-2 flex  lg:w-1/3 w-full box-border flex-col'>
            <h1 className="mb-3 text-center font-bold w-full box-border">Create Recipe</h1>
                <div className='mb-3 w-full box-border '>
                    <input
                        className='w-full p-2 rounded'
                        type="text" value={title} 
                        onChange={e => setTitle(e.target.value)}
                        placeholder='title' 
                        required
                        style={{"border": "1px solid grey"}}
                    />
                </div>
                <div className='mb-3 w-full box-border '>
                    <textarea
                        className='w-full p-2 rounded'
                        value={ingredients} 
                        onChange={e => setIngredients(e.target.value)}
                        placeholder='ingredients'
                        rows={5}
                        required 
                        style={{"border": "1px solid grey"}}
                    ></textarea>
                </div>
               <SimpleMDE  value={instructions} 
                
                    onChange={(newValue) => setInstructions(newValue)}
                    placeholder='Instructions'
                    />
                {/* <div className='mb-3 w-full box-border border-2 '>
                    <textarea
                        className='w-full p-2 rounded'
                        value={instructions} 
                        onChange={e => setInstructions(e.target.value)}
                        placeholder='instructions'
                        rows={5}
                        required 
                        style={{"border": "1px solid grey"}}
                    ></textarea>
                </div> */}
                <div className='mb-3 w-full box-border'>
                    <input
                        className='w-full p-2 rounded'
                        type="number" value={cookTime} 
                        onChange={e => setcookTime(parseInt(e.target.value))}
                        placeholder='Cook Time (minutes)' 
                        required
                        style={{"border": "1px solid grey"}}
                    />
                </div>
                <div className='mb-3 w-full box-border '>
                    <input type="file" required  onChange={handleImageUpload}/>
                </div>

                <button type='submit' className='bg-orange-600 p-3 rounded text-white'>Submit</button>
            </form> 
        </div>
    )
}

export default createRecipe
createRecipe.requireAuth = true
