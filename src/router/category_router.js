const express = require('express')
const CategoryController = require('./../controller/category_controller')

const router = express.Router()

router.post('/add',CategoryController.addcategory)
router.get('/',CategoryController.getAllCategory)
router.get('/categoryName',CategoryController.getAllCategoryName)
router.get('/categoryNameId',CategoryController.getAllCategoryNameAndId)

module.exports = router