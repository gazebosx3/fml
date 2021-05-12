const Sequelize = require('sequelize')
const db = require('../db')

const Pick = db.define('pick', {
  value: {
    type: Sequelize.INTEGER
  }
})

module.exports = Pick
