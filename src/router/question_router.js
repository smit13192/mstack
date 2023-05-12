const express = require('express')
const QuestionController = require('../controller/question_controller')

const router = express.Router()

router.post('/add',QuestionController.addQuestion)
router.get('/',QuestionController.getAllQuestions)
router.post('/getUserQuestions',QuestionController.getUserQuestions)
router.post('/addLike',QuestionController.addLike)
router.get('/:uid',QuestionController.getUserLikeQuestionsId)
router.post('/getUserLikeQuestions',QuestionController.getUserLikeQuestions)
router.delete('/:qid',QuestionController.deleteQuestion)

module.exports = router