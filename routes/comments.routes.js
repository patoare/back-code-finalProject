const { isAuthenticated } = require('../middlewares/route-guard.middleware')
const Comment = require('../models/Comments.model')
const { isValidObjectId } = require('mongoose')
const router = require('express').Router() 

//to get all the comments
router.get('/:id', async(req, res, next) => {
  const { id } = req.params;
  try{
    const comments = await Comment.find({treatment: id})
    .populate('treatment') 
    .populate('createdBy');
    
    res.json(comments)
  }catch(error) {
    next(error)
  }
})

//post a new comment
router.post('/', isAuthenticated, async(req, res, next) => {
  const commentToCreate = req.body
  try {
       const newComment = await Comment.create({...commentToCreate,
        createdBy: req.tokenPayload.userId})
        
       res.status(201).json(newComment)
  } catch (error) {
    next(error)
  }
})
module.exports = router