var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");

router.get("/", (req, res) => res.send("im here"));


/**
 * This path returns a full details of a recipe by its id
 */
router.get("/recipe", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getRecipeDetails(req.query.id);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});


// Returns 3 random recipes from the database
router.get("/random", async (req, res, next) => {
  try {
    const recipes = await recipes_utils.getRandomRecipes();
    res.send(recipes);
  } catch (error) {
    next(error);
  }
});


router.get("/search", async (req, res, next) => {
  try {
    const recipes = await recipes_utils.getSearchedRecipes(req.query.key, req.query.limit);
    res.send(recipes);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
