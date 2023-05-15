const { Schema, model } = require('mongoose')
const CategoryModel = require('./category_model')

const Question = new Schema({
    uid: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    cid: { type: Schema.Types.ObjectId, ref: 'categories', required: true },
    cname: { type: String },
    question: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: [String], default: [] },
    likes: { type: Number, default: 0 },
    userLikes: { type: [Schema.Types.ObjectId], ref: 'users', default: [] },
    createdAt: { type: Date, default: Date.now() }
})

Question.pre('save', async function (next) {
    const { name } = await CategoryModel.findById(this.cid)
    this.cname = name
})

Question.methods.addLikes = function (uid) {
    const like = this.likes
    this.likes = like + 1
    this.userLikes.push(uid)
}
Question.methods.removeLikes = function (uid) {
    const like = this.likes
    this.likes = like - 1
    this.userLikes.pull(uid)
}

const QuestionModel = model('questions', Question);
module.exports = QuestionModel