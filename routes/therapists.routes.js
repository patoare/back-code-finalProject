
const User = require('../models/User.moodel')
const router = require('express').Router()
const mongoose = require('mongoose'); 

const { isValidObjectId } = mongoose; 

router.get('/', async(req, res, next) => {
  try{
    const user = await User.find()
    res.json(user)
  }catch(error) {
    next(error)
  }
})
//to get a single therapist
router.get('/:id', async(req, res, next) => {
  const {id} = req.params

  if(isValidObjectId(id)) {
    try{
      const therapist = await User.findById(id)
      if (therapist) {
          res.status(200).json(therapist)
        } else {
          res.status(400).json()
        }
    } catch(error) {
      console.log(error)
      next(error)}
  } else {
    res.status(400).json({message: 'Invalid Id'})
  }
})

module.exports = router
