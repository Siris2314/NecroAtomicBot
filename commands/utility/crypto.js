const request = require("node-superfetch");
const {Client, Message, MessageEmbed} = require('discord.js')
require('dotenv').config()
const tz = require('moment-timezone')
const moment = require('moment')
const token = process.env.crypto

module.exports = {

    name:'crypto',
    description:'Returns Crypto Prices',

    async execute(message,args,client){

        const currency = args[0];
        const crypto = args[1];
        const url = `http://api.coinlayer.com/live?access_key=${token}&target=${currency}&symbols=${crypto}&expand=1`
        

        const {body} = await request.get(url)


        const res = JSON.parse(JSON.stringify(body))


        const cryptoprice = res.rates
        

        const rates = JSON.parse(JSON.stringify(cryptoprice))

        console.log(rates);
        
      

        

            

   

    }

}