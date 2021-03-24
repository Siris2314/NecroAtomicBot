require('dotenv').config();
const ownerid = process.env.ownerid;
const glob = require('glob')
const {Client, Message, MessageEmbed} = require('discord.js')

module.exports = {
    name:'reload',
    description: 'reloads commands(owner only)',

    async execute(message,args,client){
        if(message.author.id !== ownerid) return message.channel.send('perms denied')
      
        client.commands.sweep(() => true)
        glob(`${__dirname}/../**/*.js`, async(err, filePaths) => {
            if(err) return console.log(err)

            filePaths.forEach((file) => {
                delete require.cache[require.resolve(file)]

                const pull = require(file)

                if(pull.name){
                    console.log(`Reloaded ${pull.name}`)
                    client.commands.set(pull.name, pull)
                }

                if(pull.description && Array.isArray(pull.description)){
                    pull.description.forEach((description) => {
                        client.description.set(description, pull.name)
                    })
                }
            })
        })

        message.channel.send('Reloaded commands')


    }

}