const {reconDB} = require('reconlx')
const { mongoPath } = require('./botconfig.json')


const db = new reconDB({
  uri: mongoPath
})

module.exports = db;
