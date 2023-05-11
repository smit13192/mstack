const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const URL = process.env.DB_CONNECT
mongoose.connect(URL).then(() => {
    console.log("connected succesfully")
})

const UserModel = require('./src/model/user')

async function run() {
    const user = new UserModel({ name: "smit monpara", email: "smitmonpara2@gmail.com", age: 20 })
    await user.save()
    console.log(user)
    console.log(user.getEmail())
}

run()
