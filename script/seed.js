'use strict'

const db = require('../server/db')
const {User, Song, Pick} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const songs = await Promise.all([
    Song.create({name: 'Let it Be', artist: 'The Beatles', userId: 1}),
    Song.create({
      name: "Rapper's Delight",
      artist: 'The Sugarhill Gang',
      userId: 1
    })
  ])

  const picks = await Promise.all([
    Pick.create({value: 1, userId: 1, songId: 1}),
    Pick.create({value: 2, userId: 1, songId: 2}),
    Pick.create({value: 2, userId: 2, songId: 2})
  ])

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
