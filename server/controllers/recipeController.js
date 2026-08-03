const Recipe = require('../models/Recipe');

const createRecipe = async (req, res, next) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json({ success: true, data: recipe });
  } catch (error) {
    next(error);
  }
};

const getRecipeByMenuItem = async (req, res, next) => {
  try {
    const recipe = await Recipe.findOne({ menuItemId: req.params.menuItemId }).populate('ingredients.inventoryId');
    if (!recipe) return res.status(404).json({ success: false, message: 'Recipe not found' });
    res.status(200).json({ success: true, data: recipe });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRecipe,
  getRecipeByMenuItem
};
