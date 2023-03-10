const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
dotenv.config()
const userSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true,
      },
      email: {
            type: String,
            unique: true,
            required: true,
      },
      password: {
            type: String,
            required: true,
            minlength: 7,
            trim: true,
      },
}, {
      timestamps: true
})



userSchema.methods.generateAuthToken = async function () {
      const user = this
      const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET)
      return token
}

userSchema.statics.findByCredentials = async (email, password) => {
      const user = await User.findOne({ email })
      if (!user) {
            throw new Error('Unable to login')
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
            throw new Error('Unable to login')
      }
      return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
      const user = this
      if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password, 8)
      }
      next()
})
const User = mongoose.model('User', userSchema)
module.exports = User