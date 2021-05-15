
const RankSchema = require("../../schemas/ranks")
const {Client, Message, MessageEmbed} = require('discord.js')

module.exports = {
    name:'addrank',
    description:'Adds Role Rank System',

    async execute(message,args,client){

        if(!message.member.hasPermission('ADMINISTRATOR')) return;

        const role = message.mentions.roles.first()
        const rankName = args.slice(1).join(" ");

        if(!role) return message.channel.send('Please specify a role')
        if(!rankName) return message.channel.send('Please specify a role')
       

        RankSchema.findOne({Guild: message.guild.id, Rank:rankName}, async(err, data) => {
            if(data) return message.channel.send('This rank already exists')
            else{
                data = new RankSchema({
                    Guild: message.guild.id,
                    Rank: rankName,
                    Role: role.id
                });
                data.save();

                message.channel.send(`${role} is new rank -> ${rankName}`)
            }
        })

    }
}
