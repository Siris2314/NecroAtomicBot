const schema = require('../schemas/custom-commands');
const Discord = require('discord.js');


module.exports = {
  name: 'list',
  description: 'lists custom commands',

  async execute(message, args, client){

    const data = await schema.find({Guild: message.guild.id})
    if(!!data === false){
      return message.channel.send('There are no custom commands')
    }
    message.channel.send(

      new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(
          data.map((cmd, i) =>
            `${i + 1}: ${cmd.Command}`

          )
        )
    )
  }
}
