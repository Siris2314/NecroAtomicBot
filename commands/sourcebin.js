const {Client, Message, MessageEmbed} = require('discord.js')
const {create} = require('sourcebin')

module.exports = {
    name:'bin',
    description:'creates a source bin file',


    async execute(message, args,client){

        const language = args[0];
        const content = args.slice(1).join(" ")

        if(!content) return message.channel.send('Please give content')
     try{
        create([
            {
                name:'Random code',
                content,
                language:language,
            }
        ],
        {
            title:'Title',
            description:'Description'
        }
      ).then((value) => {
          message.channel.send(`Your code has been posted ${value.url}`)
      })
    } catch(err){
        console.log(err)
    }
    }
}