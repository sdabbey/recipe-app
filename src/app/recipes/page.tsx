'use client'
import "@/app/style.css"
import Link from "next/link";
import RecipeCard from "@/app/components/RecipeCard";
import { useEffect, useState } from "react";
import { collection, getDocs} from "firebase/firestore"
import { auth, db } from "@/app/firebase";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";


interface Recipe {
  id: string;
  title: string;
  imageUrl: string;
  ingredients: string;
  instructions: string;
  cookTime: number;
}
export default function RecipesPage() {
    const session = useSession()

    
    
      const [recipesList, setRecipeslist] = useState<Recipe[]>([]);
    
      useEffect(() => {
        const getRecipeList = async () => {
          const recipesCollection = collection(db, "recipes")
          const recipesSnapshot = await getDocs(recipesCollection);
          const recipes:any = recipesSnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
          }));
          setRecipeslist(recipes);
        }
        getRecipeList();
      }, [])
     
  return (
    <main className="recipe-container flex flex-col items-center justify-start gap-5 p-24 pb-0 pt-5 border-2" style={{ "height": "100%", "border": "1px solid red" }}>
      <div className="recipe-header flex justify-between items-center p-3 w-full h-1/5 border-2" style={{ "height": "15%" }}>
        <h4>Recipes List</h4>
        {(session.data?.user) ? <Link className="bg-purple-600 rounded text-white p-2" href={"/recipes/create"}>Add new Recipe</Link> : null}


      </div>
      <div className="recipe-wrapper flex w-full items-start justify-around flex-wrap gap-2" style={{ "height": "85%" }}>
        {recipesList.map(item => {
          return (item.imageUrl) ? <RecipeCard description={""} key={item.id} {...item}></RecipeCard> : null;
        })}

      </div>
    </main>
  )
}

