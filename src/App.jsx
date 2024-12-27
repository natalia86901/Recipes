import { useEffect, useState } from 'react'
import './App.css';
import video from './assets/food.mp4';
import MyRecipesComponents from './MyRecipesComponents';
 

function App() {

  const My_ID = "79acac67";
  const MY_KEY = "2ac67e4877799d86b63246ebf088df4d"; 

  const [myRecipeSearch, setRecipeSearch] = useState("");
  const [myRecipes, setMyRecipes] = useState([]);
  const [wordSubmitted, setWordSubmitted] = useState("avocado");

  useEffect(() => {
    const getRecipe = async()  => {
      const responce = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${My_ID}&app_key=${MY_KEY}`);
      const data = await responce.json();
      setMyRecipes(data.hits);
    }
    getRecipe()
}, [wordSubmitted])

const mySearch = (e) => {
  setRecipeSearch(e.target.value)
}

const finalSearch = (e) => {
  e.preventDefault()
  setWordSubmitted(myRecipeSearch)
}

  return (
    <div className="App">
      <div className="container">
      <video autoPlay muted loop>
        <source src={video} type="video/mp4"/>
      </video>
      <h1>Find a Recipe</h1>
      </div>

      <div className="container">
        <form onSubmit={finalSearch}>
        <input className="search" onChange={mySearch} placeholder='Search' value={myRecipeSearch}/>
        </form>
      </div>

      <div className="container">
        <button onClick = {finalSearch}>
          <img src='https://img.icons8.com/fluency/48/000000/fry.png' alt="icon"/>
        </button>
      </div>

      {myRecipes.map((element, index) => (
       <MyRecipesComponents key={index}
       label={element.recipe.label} 
       image = {element.recipe.image} 
       calories = {element.recipe.calories} 
       ingredients = {element.recipe.ingredientLines}/>
      ))}
    </div>

  );
}

export default App
