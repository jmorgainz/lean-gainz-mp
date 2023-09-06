const mongoose = require('mongoose');
const Meal = require('./meal');
const MealPlan = require('./mealPlan');
const mealsData = require('./meals.json');
const mealPlanData = require('./mealPlan.json');
 
const db = require('../config/database');

// mongoose.connect('mongodb+srv://jmorgainz:RockyTop5440@cluster0.wa9b2f4.mongodb.net/lean-gainz-meal-prep?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
// Insert the meals into the database
async function seedMeals() {
  try {
    await Meal.deleteMany(); 
    await Meal.insertMany(mealsData); 
    console.log('Meals seeded successfully');
    await MealPlan.deleteMany(); 
    await MealPlan.insertMany(mealPlanData); 
    console.log('Meal Plan seeded successfully');
  } catch (error) {
    console.error('Error seeding meals:', error);
  } finally {
    mongoose.connection.close();
  }
}
// seedMeals();

// Mealplans Seed!!!
async function seedMealPlans() {
    try {
      await MealPlan.deleteMany(); 
      await MealPlan.insertMany(mealPlanData); 
      console.log('Meal Plan seeded successfully');
    } catch (error) {
      console.error('Error seeding meal Plan:', error);
    } finally {
      mongoose.connection.close();
    }
  }

  seedMeals();
