const express = require('express')
const passport = require('passport')

const Location = require('../models/location')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// INDEX
// GET /locations
router.get('/locations', requireToken, (req, res, next) => {
  Location.find({ owner: req.user.id })
    .then(locations => {
      return locations.map(location => location.toObject())
    })
    .then(locations => res.status(200).json({ locations: locations }))
    .catch(next)
})

// SHOW
// GET /locations/5a7db6c74d55bc51bdf39793
router.get('/locations/:id', requireToken, (req, res, next) => {
  Location.findById(req.params.id)
    .then(handle404)
    .then(location => res.status(200).json({ location: location.toObject() }))
    .catch(next)
})

// CREATE
// POST /locations
// router.post('/locations', requireToken, (req, res, next) => {
//   // set owner of new location to be current user
//   req.body.location.owner = req.user.id

//   Location.create(req.body.location)
//     .then(location => {
//       res.status(201).json({ location: location.toObject() })
//     })
//     .catch(next)
// })

router.post('/locations', requireToken, (req, res, next) => {
  // get location data from request
  const location = req.body.location

  // Attach the owner using the `req.user.id`
  location.owner = req.user.id

  // save location to mongodb
  Location.create(location)
  // if successful respond with 201 and location json
    .then((location) => res.status(201).json({ location: location.toObject() }))
  // on error respond with 500 and error message
    .catch(next)
})

// UPDATE
// PATCH /locations/5a7db6c74d55bc51bdf39793
router.patch('/locations/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.location.owner

  Location.findById(req.params.id)
    .then(handle404)
    .then(location => {
      requireOwnership(req, location)
      return location.updateOne(req.body.location)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
// DELETE /locations/5a7db6c74d55bc51bdf39793
router.delete('/locations/:id', requireToken, (req, res, next) => {
  Location.findById(req.params.id)
    .then(handle404)
    .then(location => {
      requireOwnership(req, location)
      location.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
