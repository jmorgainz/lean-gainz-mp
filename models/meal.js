const mongoose = require('mongoose');


// Define the 'meals' schema
const mealSchema = new mongoose.Schema({
  name: String,
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
  price: Number,
  image: String,
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = mongoose.model('Meal', mealSchema)
