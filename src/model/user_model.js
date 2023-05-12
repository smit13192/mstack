const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 8 },
    age: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
})

// when new user save in the database then this function will be execute
User.pre('save', function (next) {
    this.email = this.email.toLowerCase()
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(this.password, salt)
    this.password = hash
    next()
})

// make your own method to the object of this model
User.methods.comparePassword = function (password) {
    const match = bcrypt.compareSync(password, this.password)
    return match
}

const UserModel = mongoose.model('users', User)
module.exports = UserModel