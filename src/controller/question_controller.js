const QuestionModel = require('../model/question_model')

const QuestionController = {
    // this method add the add question to the databse
    addQuestion: async function (req, res) {
        try {
            const data = req.body
            const question = new QuestionModel(data)
            await question.save()
            const response = { success: true, data: question, message: "question add successfully" }
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
                const response = { succes: true, data: foundQuestion, message: "like remove successfully" }
                return res.json(response)
            } else {
                const question = await QuestionModel.findById(_id)
                question.addLikes(uid)
                await question.save()
                const response = { succes: true, data: question, message: "like add successfully" }
                return res.json(response)
            }
        } catch (e) {
            const response = { success: false, message: e.message }
            return res.json(response)
        }
    },

    // get all question to user likes
    getUserLikes: async function (req, res) {
        try {
            const uid = req.params.uid
            const questions = await QuestionModel.find({ userLikes: { $in: uid } })
            console.log(questions)
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

    // delete question in the database
    deleteQuestion: async function (req, res) {
        try {
            const qid = req.params.qid
            const question = await QuestionModel.deleteOne({ _id: qid })
            const response = { succes: true, data: question, message: "question delete successfully" }
            return res.json(response)
        } catch (e) {
            const response = { success: false, message: e.message }
            return res.json(response)
        }
    }
}

module.exports = QuestionController