const { Schema, model } = require('mongoose')

const category = new Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() }
})

const CategoryModel = model('categories',category)
module.exports = CategoryModel