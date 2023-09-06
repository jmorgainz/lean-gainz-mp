const express = require('express');
const router = express.Router();
const mealsCtrl = require('../controllers/meals');

router.get('/meals', mealsCtrl.index);
router.get('/meals/:id', mealsCtrl.show); // Note the added '/meals' prefix to make the route more explicit
router.post('/add-to-meal-plan', async (req, res) => {
    const { mealIds, mealPlanType } = req.body;

    // Depending on your meal plan types
    const mealPlanConfig = {
        basic: { minMeals: 7, maxMeals: 7 },
        pro: { minMeals: 10, maxMeals: 10 },
        gainz: { minMeals: 14, maxMeals: 14 }
    };

    const selectedPlan = mealPlanConfig[mealPlanType];

    // Validate number of selected meals based on mealPlanType
    if (mealIds.length < selectedPlan.minMeals || mealIds.length > selectedPlan.maxMeals) {
        return res.status(400).send(`Please select between ${selectedPlan.minMeals} and ${selectedPlan.maxMeals} meals.`);
    }

    // Logic to add the meals to the user's meal plan in the database

    // res.redirect('/some-success-page');  // Redirect to a success page or where you want users to go next
});



module.exports = router;
