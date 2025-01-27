const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json('All good in here')
})

const therapistsRoutes = require('./therapists.routes')
const treatmentsRoutes = require('./treatments.routes')
const commentsRoutes = require('./comments.routes')

router.use('/therapists', therapistsRoutes)
router.use('/treatments', treatmentsRoutes)
router.use('/comments', commentsRoutes)

module.exports = router
