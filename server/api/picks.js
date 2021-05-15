const router = require('express').Router()
const {Pick} = require('../db/models')
module.exports = router

router.get('/userPicks/:userId', async (req, res, next) => {
  try {
    const userPicks = await Pick.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(userPicks)
  } catch (err) {
    next(err)
  }
})

router.post('/createPick', async (req, res, next) => {
  const {value, userId, songId} = req.body
  try {
    const pick = await Pick.create({value, userId, songId})

    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})
