const mongoose = require('mongoose');

// Define the 'mealPlan' schema with an embedded 'meals' array
const mealPlanSchema = new mongoose.Schema({
  name: String,
  price: Number,
  selectedMeals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal', // Refers to the 'meals' schema
  }],
});
const MealPlan = mongoose.model('MealPlan', mealPlanSchema);

// You can now query meal plans and populate the 'meals' field to retrieve the embedded meal data when needed
MealPlan.find({}).populate('selectedMeals')
module.exports = mongoose.model('MealPlan', mealPlanSchema)
// module.exports = mongoose.model('meal', mealSchema)
