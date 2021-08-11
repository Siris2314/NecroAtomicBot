const RankSchema = require("../../schemas/ranks")
const {Client, Message, MessageEmbed} = require('discord.js')

module.exports = {
    name:'deleterank',
    description:'Deletes Role from Rank System',

    async execute(message,args,client){

        if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({content:'Perms Denied'})

        
        const rankName = args.join(" ");

        if(!rankName) return message.channel.send({content:'Please specify a role'})
       

        RankSchema.findOne({Guild: message.guild.id, Rank:rankName}, async(err, data) => {
            if(data){
                await RankSchema.findOneAndDelete({Guild: message.guild.id, Rank:rankName})
                message.channel.send({content:'Rank has been deleted'})
            }
            else{
               return message.channel.send({content:'There isn\'t any data found for this rank'})
            }
        })

    }
}
