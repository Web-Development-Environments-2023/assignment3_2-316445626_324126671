const DButils = require("./DButils");

async function markAsFavorite(user_id, recipe_id){
    await DButils.execQuery(`insert into favorites(userId, recipeId) values ('${user_id}',${recipe_id})`);
}

async function getFavoriteRecipes(user_id){
    const recipes_id = await DButils.execQuery(`select recipeId from favorites where userId='${user_id}'`);
    return recipes_id;
}

async function markAsWatched(user_id, recipe_id) {
    await DButils.execQuery(`insert into watched(userId, recipeId) values ('${user_id}',${recipe_id})`);
}

async function getWatchedRecipes(user_id, limit) { //the limit will be 3 almost all the times
    const recipes_id = await DButils.execQuery(`select recipeId from watched where userId='${user_id}' order by time desc limit ${limit}`);
    return recipes_id;
}

async function addRecipe(user_id, recipe_name, proccess_time, vegan_veg, gluten, image, ingridiants, instructions, numOfPortions) {
    await DButils.execQuery(`insert into recipes(userId, name, proccess_time, vegan_veg, gluten, image, ingridiants, instructions, numOfPortions) values ('${user_id}','${recipe_name}','${proccess_time}','${vegan_veg}','${gluten}','${image}','${ingridiants}','${instructions}','${numOfPortions}')`);
}

async function getRecipe(user_id) {
    const recipes = await DButils.execQuery(`select name,proccess_time,vegan_veg,gluten,image,ingridiants,instructions,numOfPortions from recipes where userId='${user_id}'`);
    return recipes;
}

exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
exports.markAsWatched = markAsWatched;
exports.getWatchedRecipes = getWatchedRecipes;
exports.addRecipe = addRecipe;
exports.getRecipe = getRecipe;