const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json('All good in here')
})

const therapistsRoutes = require('./therapists.routes')
const treatmentsRoutes = require('./treatments.routes')

router.use('/therapists', therapistsRoutes)
router.use('/treatments', treatmentsRoutes)

module.exports = router
