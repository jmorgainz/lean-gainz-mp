const mongoose = require('mongoose');

// Define the 'meals' schema
// const mealSchema = new mongoose.Schema({
//   name: String,
//   calories: Number,
//   price: Number,
// });

// Define the 'mealPlan' schema with an embedded 'meals' array
const mealPlanSchema = new mongoose.Schema({
  name: String,
  price: Number,
  selectedMeals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal', // Refers to the 'meals' schema
  }],
});

// Create models for 'Meal' and 'MealPlan'
// const Meal = mongoose.model('Meal', mealSchema);
const MealPlan = mongoose.model('MealPlan', mealPlanSchema);

// You can now query meal plans and populate the 'meals' field to retrieve the embedded meal data when needed
MealPlan.find({}).populate('selectedMeals')
module.exports = mongoose.model('MealPlan', mealPlanSchema)
// module.exports = mongoose.model('meal', mealSchema)
