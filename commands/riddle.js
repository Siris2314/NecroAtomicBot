const Discord = require('discord.js')
const axios = require('axios')

module.exports = {
  name:"riddle",
  description: "fun and random riddles",

  async execute(message,args,client){

    const url = `https://www.no-api-key.com/api/v1/riddle`

    let data, response;

    try {
      response = await axios.get(url)
      data = response.data
      console.log(data)
    } catch(e) {
      return message.channel.send(`An Error has occured`)
    }

    const embed = new Discord.MessageEmbed()
      .setTitle('Random Riddle: ')
      .addField(data.question)
      .setDescription('')
      .addField('||' + data.answer + '||')
      .setDescription('')
      .setColor("RANDOM")

    message.channel.send(embed)
  }
}
