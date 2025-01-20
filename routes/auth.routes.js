const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User.moodel')
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('../middlewares/route-guard.middleware')

router.get('/', (req, res) => {
  res.json('All good in auth')
})

// POST Signup
router.post('/signup', async(req, res, next) => {
const credentials = req.body

const salt = bcrypt.genSaltSync(13)
const passwordHash = bcrypt.hashSync(credentials.password, salt)

try {
const newUser = await User.create({
  username: credentials.username,
  email: credentials.email,
  passwordHash: passwordHash,
})
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
    const payload = {userId: potentialUser._id}
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET,
    { algorithm: 'HS256',
      expiresIn: "6h"}
  )
res.json(authToken)
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
router.get('/verify', isAuthenticated, async(req, res, next) => {
  try {
    const currentUser = await User.findById(req.tokenPayload.userId)
  } catch(error) {
    next(error)
  }
 res.json('estas viendo este rdo porque el tokes es correcto')
})


module.exports = router
