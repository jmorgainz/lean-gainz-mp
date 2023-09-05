const mongoose = require('mongoose');
const Meal = require('./models/mealPlan');

mongoose.connect('mongodb://localhost/lean-gainz-meal-prep.meals', { useNewUrlParser: true, useUnifiedTopology: true });

const mealsData = [
  {
    name: 'Chicken Salad',
    calories: 400,
    price: 10.99,
  },
  {
    name: 'Spaghetti Bolognese',
    calories: 600,
    price: 12.99,
  },
  {
    name: 'Chicken Fried Rice',
    calories: 400,
    price: 10.99,
  },
  {
    name: 'Thai Chicken Curry',
    calories: 600,
    price: 12.99,
  },
  {
    name: 'Jerk Chicken',
    calories: 400,
    price: 10.99,
  },
  {
    name: 'Cheesy Chicken and Rice',
    calories: 600,
    price: 12.99,
  },
  {
    name: 'Pork Bahn Mi Bowl',
    calories: 400,
    price: 10.99,
  },
  
  {
    name: 'Stuffed Bell Peppers',
    calories: 600,
    price: 12.99,
  },
  {
    name: 'Mushroom Chicken',
    calories: 400,
    price: 10.99,
  },
  
  {
    name: 'Meatball Heaven',
    calories: 600,
    price: 12.99,
  },
];

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

module.exports = mongoose.model('mealsData')