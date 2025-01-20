const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User.moodel')

router.get('/', (req, res) => {
  res.json('All good in auth')
})

// POST Signup
router.post('/signup', async(req, res, next) => {
const credentials = req.body

const salt = bcrypt.genSaltSync(13)
const passwordHash = bcrypt.hashSync(credentials.password, salt)

try {
const newUser = await User.create(...credentials, passwordHash)
res.status(201).json()
} catch(error) {
  next(error)
}
})
//POST Login
router.post('/login', async(req, res, next) => {
  const credentials = req.body
try {
const potentialUser = await User.findOne({username: credentials.username})
if(potentialUser) {
  if(bcrypt.compareSync(credentials.password, potentialUser.passwordHash)) {
res.json()
  } else {
    res.status(403).json()
  }
} else {
  res.status(400).json()
}
} catch(error) {
  next(error)
}
})
//Get Verify

module.exports = router
