const express = require('express')
const QuestionController = require('../controller/question_controller')

const router = express.Router()

router.post('/add',QuestionController.addQuestion)
router.post('/addLike',QuestionController.addLike)
router.get('/:uid',QuestionController.getUserLikes)
router.delete('/:qid',QuestionController.deleteQuestion)

module.exports = router