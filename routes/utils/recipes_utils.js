const axios = require("axios");
const api_domain = "https://api.spoonacular.com/recipes";
const api_key = "dd3fcdf64d04477bb53d37471e2924a1";



/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info 
 */


async function getRecipeInformation(recipe_id) {
    return await axios.get(`${api_domain}/${recipe_id}/information`, {
        params: {
            includeNutrition: false,
            apiKey: api_key
        }
    });
}



async function getRecipeDetails(recipe_id) {
    let recipe_info = await getRecipeInformation(recipe_id);
    return format(recipe_info.data);
}

function format(recipe_data) {
    let { id, title, readyInMinutes, image, aggregateLikes, vegan, vegetarian, glutenFree } = recipe_data;

    return {
        id: id,
        recipe: {
            name: title,
            time: readyInMinutes,
            mainImage: image,
            popularity: aggregateLikes,
            vegan: vegan,
            vegetarian: vegetarian,
            glutenFree: glutenFree
        }
    }
}

function formatAsList(listOfRecipes) {
    recipes = []
    for (const recipe of listOfRecipes) {
        recipes.push(format(recipe));
    }
    return {
        amount: listOfRecipes.length,
        recipes: recipes
    };
}

async function getRandomRecipes(){
    let recipes = await axios.get(`${api_domain}/random`, {
        params: {
            includeNutrition: false,
            apiKey: api_key,
            number: 3
        }
    });
    return formatAsList(recipes.data.recipes)
}

async function getRecipesPreview(recipes_ids) {
    let ids = recipes_ids.join()
    let recipes_info = await axios.get(`${api_domain}/informationBulk`, {
        params: {
            includeNutrition: false,
            apiKey: api_key,
            ids: ids
        }
    });
    return formatAsList(recipes_info.data);
}

async function getSearchedRecipes(query, limit) {
    let recipes_info = await axios.get(`${api_domain}/complexSearch`, {
        params: {
            includeNutrition: false,
            apiKey: api_key,
            number: limit,
            query: query
        }
    });
    ids = [];
    const results = recipes_info.data.results;
    results.map((element) => ids.push(element.id)); //extracting the recipes' ids into array
    return getRecipesPreview(ids);
}

exports.getRecipeDetails = getRecipeDetails;
exports.getRandomRecipes = getRandomRecipes;
exports.getRecipesPreview = getRecipesPreview;
exports.getSearchedRecipes = getSearchedRecipes;


