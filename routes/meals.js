const express = require('express')
const router = express.Router()

const mealsCtrl = require('../controllers/meals')

router.get('/meals', mealsCtrl.show)
router.get('/:id', mealsCtrl.show)

module.exports = router;