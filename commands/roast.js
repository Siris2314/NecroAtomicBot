const fetch  = require('node-fetch')
const Discord = require('discord.js')

module.exports = {

  name:'roast',
  description:'roasts someone',

  async execute(message,args,client){

    if(!args[0]){
      return message.channel.send('Please specify a user to roast')
    }

    const member = message.mentions.members.first()

    if(!member){
      return message.channel.send('Member not in server')
    }
    fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json')
          .then(res => res.json())
          .then(json => {
            const roast = new Discord.MessageEmbed()
              .setTitle('Roast')
              .setColor("RANDOM")
              .setDescription(' ', true)
              .addField(member.user.tag + ' ' + `${json.insult}`)


            message.channel.send(roast)
          })
  }
}
