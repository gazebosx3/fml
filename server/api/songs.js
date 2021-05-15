const router = require('express').Router()
const {Song} = require('../db/models')
module.exports = router

router.get('/userSongs/:userId', async (req, res, next) => {
  try {
    const songs = await Song.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/createSong', async (req, res, next) => {
  const {artist, name, userId} = req.body
  try {
    const user = await User.create({artist, name, userId})

    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})
