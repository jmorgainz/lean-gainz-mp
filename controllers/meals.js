const Meal = require('../models/mealPlan')

module.exports = {
    index,
    show,
}

async function index(req, res) {
    try {
      const meals = await Meal.find({});
      res.render('meals/index', { title: 'All Meals', meals });
    } catch (error) {
      console.error('Error fetching meals:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async function show(req, res) {
    try {
      const mealId = req.params.id;
      const meal = await Meal.findById(mealId); // Fetch the meal by ID
      if (!meal) {
        return res.status(404).send('Meal not found');
      }
      res.render('meals/show', { title: 'Meal Details', meal });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
  