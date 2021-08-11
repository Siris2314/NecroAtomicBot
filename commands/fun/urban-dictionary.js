const {Client, Message, MessageEmbed} = require('discord.js')
const axios = require('axios')

module.exports = {
  name:"urban",
  description:'Looks Up Stuff on Urban Dictionary',

  async execute(message,args,client){
    let query = args.join(" ");

    if(!query){
      return message.channel.send('Please specify word to look up')
    }
    query = encodeURIComponent(query)

    try{

    const {
      data: {list}
    } = await axios.get(
      `https://api.urbandictionary.com/v0/define?term=${query}`
      );
    const [answer] = list;

    const embed = new MessageEmbed()
      .setTitle(answer.word)
      .setURL(answer.permalink)
      .setColor('RANDOM')
      .addField('DEFINITION', trim(answer.definition))
      .addField('EXAMPLE', trim(answer.example))
      .addField(
        "RATINGS",
        `${answer.thumbs_up} 👍 || ${answer.thumbs_down} 👎`
      )

      return message.channel.send({embeds:[embed]});
  } catch(err){
    return message.channel.send("Word not found")
  }

}
}

function trim(input){
  return input.length > 1024 ? `${input.slice(0, 1020)} ... ` : input;
}
