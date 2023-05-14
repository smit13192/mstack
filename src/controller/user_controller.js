const UserModel = require('../model/user_model')

const UserController = {
    createUser: async function (req, res) {
        try {
            const data = req.body
            const foundUser = await UserModel.findOne({ email: data.email })
            if (foundUser) {
                const response = { success: false, message: "Email is already exist" }
                return res.json(response)
            }
            const user = new UserModel(data)
            await user.save()
            const response = { success: true, data: user, message: "new user created" }
            return res.json(response)
        } catch (e) {
            const response = { success: false, message: e.message }
            return res.json(response)
        }
    },
    sighIn: async function (req, res) {
        try {
            const data = req.body
            const foundUser = await UserModel.findOne({ email: data.email })
            if (!foundUser) {
                const response = { success: false, message: "Email is not exist" }
                return res.json(response)
            }
            const match = foundUser.comparePassword(data.password)
            if (!match) {
                const response = { success: false, message: "password is wrong" }
                return res.json(response)
            }
            const response = { success: true, data: foundUser, message: "sigh in successfully" }
            return res.json(response)
        } catch (e) {
            const response = { success: false, message: e.message }
            return res.json(response)
        }
    }
}

module.exports = UserController