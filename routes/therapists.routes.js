
const User = require('../models/User.moodel')
const router = require('express').Router()

router.get('/', async(req, res, next) => {
  try{
    const user = await User.find()
    res.json(user)
  }catch(error) {
    next(error)
  }
})

module.exports = router
