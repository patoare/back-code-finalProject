/*const { isAuthenticated } = require('../middlewares/route-guard.middleware')
const Comment = require('../models/Comments.model')
const Treatment = require('../models/Treatment.model')
const { isValidObjectId } = require('mongoose')
const router = require('express').Router();

// to Add a single comment to a particular treatment
router.post('/:id/comments', isAuthenticated, async (req, res, next) => {
    const { treatmentId } = req.params;
    const { content } = req.body;
  
    try {
    
      const treatment = await Treatment.findById(treatmentId);
      if (!treatment) {
        return res.status(404).json({ message: 'Treatment not found' });
      }
  
      
      const newComment = await Comment.create({
        content,
        treatment: treatmentId,
        createdBy: req.tokenPayload.userId, 
      });
      
    treatment.comments.push(newComment._id);
    await treatment.save();

    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
});

    

//to get a single treatment
router.get('/:id/comments', async (req, res, next) => {
    const { treatmentId } = req.params;
  
    try {
      // Obtener el tratamiento con los comentarios poblados
      const treatment = await Treatment.findById(treatmentId).populate('comments');
      if (!treatment) {
        return res.status(404).json({ message: 'Treatment not found' });
      }
  
      res.status(200).json(treatment.comments);
    } catch (error) {
      next(error);
    }
  });

  module.exports = router*/