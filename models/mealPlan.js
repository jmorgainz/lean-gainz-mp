const mongoose = require('mongoose');

// Define the 'meals' schema
const mealSchema = new mongoose.Schema({
  name: String,
  calories: Number,
  price: Number,
});

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
const Meal = mongoose.model('Meal', mealSchema);
const MealPlan = mongoose.model('MealPlan', mealPlanSchema);

// Create meal plans
const plan1 = new MealPlan({
  name: 'Plan 1',
  price: 30.99,
//   meals: [meal1._id, meal2._id],
});

const plan2 = new MealPlan({
  name: 'Plan 2',
  price: 25.99,
//   meals: [meal2._id],
});

// // Save meals and meal plans to the database
// meal1.save();
// meal2.save();
// plan1.save();
// plan2.save();

// You can now query meal plans and populate the 'meals' field to retrieve the embedded meal data when needed
MealPlan.find({}).populate('selectedMeals')
module.exports = mongoose.model('MealPlan', mealPlanSchema)
// module.exports = mongoose.model('meal', mealSchema)
