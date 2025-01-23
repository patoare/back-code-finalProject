const { isAuthenticated } = require('../middlewares/route-guard.middleware')
const Treatment = require('../models/Treatment.model')
const { isValidObjectId } = require('mongoose')
const router = require('express').Router() 

//to get all the treatments
router.get('/', async(req, res, next) => {
  try{
    const treatments = await Treatment.find().populate('createdBy', '-passwordHash')
    res.json(treatments)
  }catch(error) {
    next(error)
  }
})

//to get a single treatment
router.get('/:treatmentId', async(req, res, next) => {
  const {treatmentId} = req.params

  if(isValidObjectId(treatmentId)) {
    try{
      const treatment = await Treatment.findById(treatmentId)
      if (treatment) {
          res.status(200).json(treatment)
        } else {
          res.status(400).json()
        }
    } catch(error) {
      next(error)}
  } else {
    res.status(400).json({message: 'Invalid Id'})
  }
})

//to create a new treatment
router.post('/', isAuthenticated, async(req, res, next) => {
  const treatmentToCreate = req.body
  try {
       const newTreatment = await Treatment.create({...treatmentToCreate,
        createdBy: req.tokenPayload.userId})
       res.status(201).json(newTreatment)
  } catch (error) {
    next(error)
  }
})

//to delete a treatment (only for the user that create it)
router.delete('/:treatmentId', isAuthenticated, async(req, res, next) => {
  const {treatmentId} = req.params
  if(isValidObjectId(treatmentId)) {
    try{
      const bookToDelete = await Treatment.findById(treatmentId)
      if (bookToDelete) {
        if(bookToDelete.createdBy == req.tokenPayload.userId) {
          await Treatment.findByIdAndDelete(treatmentId)
          res.status(204).json()
        } else {
          res.status(403).json()
        }
      } else {
        res.status(400).json()
      }     
    } catch(error) {
      next(error)}
  } else {
    res.status(400).json({message: 'Invalid Id'})
  }
})

module.exports = router
