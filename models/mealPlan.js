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

// Example usage:

// Create meals
const meal1 = new Meal({
  name: 'Chicken Salad',
  calories: 400,
  price: 10.99,
});

const meal2 = new Meal({
  name: 'Spaghetti Bolognese',
  calories: 600,
  price: 12.99,
});
const meal3 = new Meal({
  name: 'Chicken Fried Rice',
  calories: 400,
  price: 10.99,
});

const meal4 = new Meal({
  name: 'Thai Chicken Curry',
  calories: 600,
  price: 12.99,
});
const meal5 = new Meal({
  name: 'Jerk Chicken',
  calories: 400,
  price: 10.99,
});

const meal6 = new Meal({
  name: 'Cheesy Chicken and Rice',
  calories: 600,
  price: 12.99,
});
const meal7 = new Meal({
  name: 'Pork Bahn Mi Bowl',
  calories: 400,
  price: 10.99,
});

const meal8 = new Meal({
  name: 'Stuffed Bell Peppers',
  calories: 600,
  price: 12.99,
});
const meal9 = new Meal({
  name: 'Mushroom Chicken',
  calories: 400,
  price: 10.99,
});

const meal10 = new Meal({
  name: 'Meatball Heaven',
  calories: 600,
  price: 12.99,
});


// Create meal plans
const plan1 = new MealPlan({
  name: 'Plan 1',
  price: 30.99,
  meals: [meal1._id, meal2._id],
});

const plan2 = new MealPlan({
  name: 'Plan 2',
  price: 25.99,
  meals: [meal2._id],
});

// Save meals and meal plans to the database
meal1.save();
meal2.save();
plan1.save();
plan2.save();

// You can now query meal plans and populate the 'meals' field to retrieve the embedded meal data when needed
MealPlan.find({}).populate('selectedMeals').exec(
//     (err, mealPlans) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(mealPlans);
// }
);
module.exports = mongoose.model('MealPlan', mealPlanSchema)