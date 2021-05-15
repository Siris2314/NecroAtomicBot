const {Client, Message, MessageEmbed} = require('discord.js')
const {antijoin} = require('../../index.js')


module.exports = {
    name: 'antijoin',
    description: 'prevents raids in server',
    async execute(message,args,client){

        if(!message.member.hasPermission('ADMINSTRATOR')) return;

        const query = args[0].toLowerCase();

        if(!query) return message.channel.send('Please enter a query')
        const getCollection = antijoin.get(message.guild.id)

        if(query === 'on'){
            if(getCollection){
                return message.channel.send('Antijoin is already enabled')
            }

            antijoin.set(message.guild.id, [])
            message.channel.send('Turned on Antijoin')



        } else if(query === 'off'){
            if(!getCollection){
                return message.channel.send('Antijoin is already disabled')
            }

            antijoin.delete(message.guild.id)
            message.channel.send('Antijoin has been disabled')

        } else if(query === 'list'){
            if(!getCollection) return message.channel.send('Antijoin is disabled')

            message.channel.send(
                `Kicked Members: ${getCollection.map((value) => {
                    return `${value.tag} (${value.id})`
                })}`
            )
        }





    }
}