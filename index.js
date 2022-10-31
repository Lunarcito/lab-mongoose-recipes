const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

/*

mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  */

//Iteration 1: Connection to the database "recipe-app"

const connectToMongo = async function() {
  try {
    const x = await mongoose.connect(MONGODB_URI )
    console.log( `conected to ${x.connection.name}`)
    createRecipe()
    addRecipes ()
    updateRecipe()
    deleteRecipe()
  } catch (err) {
    console.log(err)
  }
}

//Iteration 2: Create a recipe

const createRecipe = async function () {  
  try{
    const myReceipe = await Recipe.create({
      title: "PizzaC",
      level: "Easy Peasy",
      ingredients: ["Extra virgin olive oil","Cornmeal","Tomato sauce","Firm mozzarella cheese","Fresh soft mozzarella cheese","Parmesan cheese","Feta cheese"],
      cuisine: "Italian",
      dishType: "main_course",
      image: "",
      duration: 30,
      creator: "Carolina"
    })
    //console.log(myReceipe)
  
  } catch(err){
    console.log('ERROR: ', err)
  }

}
//Iteration 3: Insert Multiple Recipes
const addRecipes = async function () {  
  try{
    const newRecipes = await Recipe.insertMany(data)
    for (let i =0; i< newRecipes.length;i++){
      console.log (newRecipes[i].title)
    }

  } catch(err){
    console.log('ERROR: ', err)
  }
} 


//Iteration 4: Update Recipes

const updateRecipe = async function () {  
  try{
    const updatedRecipes = await Recipe.updateOne({title:"Rigatoni alla Genovese"},{duration:100});
    console.log (`Has been fixed ${updatedRecipes.title}`)
  } catch(err){
    console.log('ERROR: ', err)
  }
} 


//Iteration : Delete a Recipe

const deleteRecipe = async function () {  
  try{
    const deletedRecipes = await Recipe.deleteOne({title: Carrot Cake});
    console.log ("Deleted")

} catch(err){
    console.log('ERROR: ', err)
  }
} 

connectToMongo();
