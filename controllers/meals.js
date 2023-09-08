const Meal = require('../models/meal');  // Make sure to fetch the 'Meal' model, not 'MealPlan'

module.exports = {
    index,
    show,
}

async function index(req, res) {
    try {
        const meals = await Meal.find({});
        // console.log("Fetched meals:", meals)
        // res.json(meals)
        res.render('meals/index', { allMeals: meals });
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
        res.render('meals/show', { title: meal.name, meal });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
