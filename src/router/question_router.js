const express = require('express')
const QuestionController = require('../controller/question_controller')

const router = express.Router()

router.post('/add',QuestionController.addQuestion)
router.get('/getAllQuestions',QuestionController.getAllQuestions)
router.post('/getUserQuestions',QuestionController.getUserQuestions)
router.post('/addLike',QuestionController.addLike)
router.get('/:uid',QuestionController.getUserLikeQuestions)
router.delete('/:qid',QuestionController.deleteQuestion)

module.exports = router