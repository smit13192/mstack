const CategoryModel = require('./../model/category_model')

const CategoryController = {
    // add category
    addcategory: async function (req, res) {
        try {
            const category = new CategoryModel(req.body)
            await category.save()
            const response = { success: true, data: category }
            return res.json(response)
        } catch (e) {
            const response = { success: false, message: e.message }
            return res.json(response)
        }
    },

    // get all category
    getAllCategory: async function (req, res) {
        try {
            const categories = await CategoryModel.find()
            const response = { success: true, data: categories }
            return res.json(response)
        } catch (e) {
            const response = { success: false, message: e.message }
            return res.json(response)
        }
    },

    // get only category name
    getAllCategoryName: async function (req, res) {
        try {
            const categories = await CategoryModel.find().select("name")
            const categoryName = categories.map(category => category.name)
            const response = { success: true, data: categoryName }
            return res.json(response)
        } catch (e) {
            const response = { success: false, message: e.message }
            return res.json(response)
        }
    },

    // get category name and id
    getAllCategoryNameAndId: async function (req, res) {
        try {
            const categories = await CategoryModel.find().select("name")
            const response = { success: true, data: categories }
            return res.json(response)
        } catch (e) {
            const response = { success: false, message: e.message }
            return res.json(response)
        }
    },
}

module.exports = CategoryController