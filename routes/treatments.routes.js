const { isAuthenticated } = require('../middlewares/route-guard.middleware')
const Treatment = require('../models/Treatment.model')
const { isValidObjectId } = require('mongoose')
const router = require('express').Router() 

//to get all the treatments
router.get('/', async(req, res, next) => {
  try{
    const treatments = await Treatment.find().populate('createdBy', 'username _id')
    res.json(treatments)
  }catch(error) {
    next(error)
  }
})

//to get a single treatment
router.get('/:id', async(req, res, next) => {
  const {id} = req.params

  if(isValidObjectId(id)) {
    try{
      const treatment = await Treatment.findById(id);
      if (treatment) {
          res.status(200).json(treatment)
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
router.delete('/:id', isAuthenticated, async (req, res, next) => {
  const { id } = req.params;

  try {
    const treatment = await Treatment.findById(id);

    // Verificar si el tratamiento existe
    if (!treatment) {
      return res.status(404).json({ message: 'Treatment not found' });
    }

    // Verificar si el usuario autenticado es el propietario
    if (treatment.createdBy.toString() !== req.tokenPayload.userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this treatment' });
    }

    // Eliminar el tratamiento
    await Treatment.findByIdAndDelete(id);
    res.status(204).send(); // Respuesta exitosa sin contenido
  } catch (error) {
    next(error);
  }
});

module.exports = router
