const {reconDB} = require('reconlx')
require('dotenv').config();
const mongoPath = process.env.mongoPath;


const db = new reconDB({
  uri: mongoPath
})

module.exports = db;
