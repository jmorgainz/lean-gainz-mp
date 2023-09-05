const express = require('express')
const router = express.Router()

const mealsCtrl = require('../controllers/meals')

router.get('/meals', mealsCtrl.index)
router.get('/:id', mealsCtrl.show)

module.exports = router;