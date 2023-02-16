const jwt = require("jsonwebtoken")
const User = require("../models/userSchema")
exports.isAuthenticatedUser = async (req, res, next) => {
      const { token } = req.cookies;
      if (!token) {
            return res.status(401).json({
                  error: "Please login"
            })
      }
      const decodeToken = jwt.verify(token, "thisismynewcourse")
      req.user = await User.findById(decodeToken._id)
      next()
}