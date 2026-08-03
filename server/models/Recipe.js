const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true, unique: true },
  ingredients: [{
    inventoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required: true },
    quantity: { type: Number, required: true }, // exact amount to deduct per sale
    unit: { type: String, required: true } // e.g., 'grams', 'ml', 'pieces'
  }],
  instructions: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
