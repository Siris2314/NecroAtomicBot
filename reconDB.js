const {reconDB} = require('reconlx')


const db = new reconDB({
  uri: "mongodb://localhost:27017"
})

module.exports = db;
