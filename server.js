const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const URL = process.env.DB_CONNECT
mongoose.connect(URL).then(() => {
    console.log("connected succesfully")
})

const UserModel = require('./src/model/user')

async function run() {
    const result = await UserModel.deleteMany({})
    console.log(result)
}

run()
