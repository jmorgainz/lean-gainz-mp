const mongoose = require('mongoose');

// Define the 'mealPlan' schema with an embedded 'meals' array
const mealPlanSchema = new mongoose.Schema({
  plan: String,
  minMeals: Number,
  maxMeals: Number,
  price: Number,
  selectedMeals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal', // Refers to the 'meals' schema
  }],
});
// MealPlan.find({}).populate('selectedMeals')
module.exports = mongoose.model('MealPlan', mealPlanSchema)

