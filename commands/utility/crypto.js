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

    try{

        const currency = args[0];
        const crypto = args[1];
        const url = `http://api.coinlayer.com/live?access_key=${token}&target=${currency}&symbols=${crypto}&expand=1`
        

        const {body} = await request.get(url)



        const res = JSON.parse(JSON.stringify(body))


        const time = moment(res.timestamp).fromNow();

        const cryptoprice = res.rates
        

        const rates = JSON.parse(JSON.stringify(cryptoprice))

        const stats = rates[crypto.toUpperCase()]


        client.embed(message,{
            title: `${currency.toUpperCase()} to ${crypto.toUpperCase()}`,
            description: `
               1 ${crypto.toUpperCase()} - ${stats.rate} ${currency.toUpperCase()}
               \nLow Price - ${stats.low} ${currency.toUpperCase()}
               \nHigh Price - ${stats.high} ${currency.toUpperCase()}
               \nMarket Volume - ${stats.vol} ${currency.toUpperCase()}
               \nMarket Cap - ${stats.cap} ${currency.toUpperCase()}
               \nPercent Change(As of Today) ${stats.change_pct * 100}


            `,
            color:'RANDOM',
            image:{
                url: 'https://coincentral.com/wp-content/uploads/2018/04/bitcoin-mining.png'
            },
            footer: {
                text: `${message.author.username}`,
                iconURL: `${message.author.displayAvatarURL({dynamic: true})}`
            },
            timestamp: Date.now()
        })


        
      

    } catch(err){
        console.log(err)
        message.channel.send('Please enter in a valid currency/coin')
    }

            

   

    }

}