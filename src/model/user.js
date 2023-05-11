const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now() }
})

User.pre('save', function (next) {
    this.email = this.email.toLowerCase()
    next()
})

// make your own method to the object of this model
User.methods.getEmail = function () {
    return this.email
}

const UserModel = mongoose.model('user', User)
module.exports = UserModel