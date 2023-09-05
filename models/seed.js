const mongoose = require('mongoose');
const Meal = require('./meal');
// const Meal = require('./mealPlan');
const mealsData = require('./data.json');
 
const db = require('../config/database');

// mongoose.connect('mongodb+srv://jmorgainz:RockyTop5440@cluster0.wa9b2f4.mongodb.net/lean-gainz-meal-prep?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Insert the meals into the database
async function seedMeals() {
  try {
    await Meal.deleteMany(); 
    await Meal.insertMany(mealsData); 
    console.log('Meals seeded successfully');
  } catch (error) {
    console.error('Error seeding meals:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the seedMeals function to populate the database
seedMeals();

// Mealplans Seed!!!
// Insert the meals into the database
async function seedMealPlans() {
    try {
      await Meal.deleteMany(); 
      await Meal.insertMany(mealPlanData); 
      console.log('Meal Plan seeded successfully');
    } catch (error) {
      console.error('Error seeding meal Plan:', error);
    } finally {
      mongoose.connection.close();
    }
  }
  
  // Run the seedMeals function to populate the database
  seedMealPlans();

// module.exports = mongoose.model('mealsData')