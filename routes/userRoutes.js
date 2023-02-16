const express = require('express')
const User = require("../models/userSchema")
const { isAuthenticatedUser } = require("../util/auth")
const router = new express.Router()

router.post('/new/user', async (req, res) => {
      try {
            const user = new User(req.body)
            await user.save()
            const token = await user.generateAuthToken()
            res.status(201).cookie("token", token).json({
                  success: true,
                  user,
                  token,
            });

      } catch (e) {
            res.status(400).json({
                  error: e.message
            })
      }
})

router.post('/users/login', async (req, res) => {
      try {
            const user = await User.findByCredentials(req.body.email, req.body.password)
            const token = await user.generateAuthToken()
            res.status(200).cookie("token", token).json({
                  success: true,
                  user,
                  token,
            });
      } catch (e) {
            res.status(400).json({
                  error: e.message
            })
      }
})

router.post('/users/logout', isAuthenticatedUser, async (req, res) => {
      try {
            req.user = null
            res.status(200).clearCookie("token").json({
                  success: true,
                  message: "loggged out"
            })
      } catch (e) {
            res.status(500).json({
                  error: e.message
            })
      }
})

router.get('/users/me', isAuthenticatedUser, async (req, res) => {
      try {
            res.json({
                  user: req.user
            })
      } catch (error) {
            res.status(500).json({
                  error: error.message
            })
      }

})

router.patch('/users/me', isAuthenticatedUser, async (req, res) => {
      const updates = Object.keys(req.body)
      const allowedUpdates = ['name', 'email', 'password', 'age']
      const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
      if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
      }

      try {
            updates.forEach((update) => req.user[update] = req.body[update])
            await req.user.save()
            res.status(200).json({
                  success: true,
                  user: req.user
            })
      } catch (e) {
            res.status(400).json({
                  error: e.message
            })
      }
})
module.exports = router