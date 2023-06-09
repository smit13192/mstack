const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())
app.use(helmet())

const URL = process.env.DB_CONNECT
mongoose.connect(URL).then(() => {
    console.log("connected succesfully")
})

app.get('/',(req,res)=>res.send('Main Page'))

const userRouter = require('./src/router/user_router')
app.use('/users',userRouter)

const categoryRouter = require('./src/router/category_router')
app.use('/categories',categoryRouter)

const questionRouter = require('./src/router/question_router')
app.use('/questions',questionRouter)


const PORT = process.env.PORT || 5000
app.listen(PORT,()=> console.log(`running port is ${PORT}`));
