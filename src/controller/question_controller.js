const CategoryModel = require('../model/category_model')
const QuestionModel = require('../model/question_model')

const QuestionController = {
    // this method add the add question to the databse
    addQuestion: async function (req, res) {
        try {
            const data = req.body
            const question = new QuestionModel(data)
            await question.save()
            const response = { success: true, message: "question add successfully" }
            return res.json(response)
        } catch (e) {
            const response = { success: false, message: e.message }
            return res.json(response)
        }
    },

    // get all question
    getAllQuestions: async function (req, res) {
        try {
            const questions = await QuestionModel.find()
            const response = { success: true, data: questions }
            return res.json(response)
        } catch (e) {
            const response = { success: false, message: e.message }
            return res.json(response)
        }
    },

    // get all user question
    getUserQuestions: async function (req, res) {
        try {
            const uid = req.body.uid
            const questions = await QuestionModel.find({ uid: uid })
            const response = { success: true, data: questions }
            return res.json(response)
        } catch (e) {
            const response = { success: false, message: e.message }
            return res.json(response)
        }
    },

    // add and remove like in the database
    addLike: async function (req, res) {
        try {
            const { _id, uid } = req.body
            const foundQuestion = await QuestionModel.findOne({ _id: _id, userLikes: { $in: uid } })
            if (foundQuestion) {
                foundQuestion.removeLikes(uid)
                await foundQuestion.save()
                const response = { succes: true, message: "like remove successfully" }
                return res.json(response)
            } else {
                const question = await QuestionModel.findById(_id)
                question.addLikes(uid)
                await question.save()
                const response = { succes: true, message: "like add successfully" }
                return res.json(response)
            }
        } catch (e) {
            const response = { success: false, message: e.message }
            return res.json(response)
        }
    },

    // question by the category 
    questionsByCategoryId: async function (req, res) {
        try {
            const cid = req.params.cid
            const questions = await QuestionModel.find({ cid: cid })
            const response = { success: true, data: questions }
            return res.json(response)
        } catch (e) {
            const response = { success: false, message: e.message }
            return res.json(response)
        }
    },

    // question by the category name
    questionsByCategoryName: async function (req, res) {
        try {
            const cname = req.body.name
            const category = await CategoryModel.findOne({ name: cname })
            const questions = await QuestionModel.find({ cid: category._id })
            const response = { success: true, data: questions }
            return res.json(response)
        } catch (e) {
            const response = { success: false, message: e.message }
            return res.json(response)
        }
    },

    // get all question's id to user likes
    getUserLikeQuestionsId: async function (req, res) {
        try {
            const uid = req.params.uid
            const questions = await QuestionModel.find({ userLikes: { $in: uid } })
            const listOfQuestion = questions.map((question) => {
                return question._id
            })
            const response = { success: true, data: listOfQuestion }
            return res.json(response)
        } catch (e) {
            const response = { success: false, message: e.message }
            return res.json(response)
        }
    },

    // get all question to user like
    getUserLikeQuestions: async function (req, res) {
        try {
            const uid = req.body.uid
            const questions = await QuestionModel.find({ userLikes: { $in: uid } })
            const response = { success: true, data: questions }
            return res.json(response)
        } catch (e) {
            const response = { success: false, message: e.message }
            return res.json(response)
        }
    },

    // delete question in the database
    deleteQuestion: async function (req, res) {
        try {
            const qid = req.params.qid
            await QuestionModel.deleteOne({ _id: qid })
            const response = { succes: true, message: "question delete successfully" }
            return res.json(response)
        } catch (e) {
            const response = { success: false, message: e.message }
            return res.json(response)
        }
    }
}

module.exports = QuestionController