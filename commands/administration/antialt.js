const {Client, Message, MessageEmbed} = require('discord.js');
const schema = require('../../schemas/anti-alt');

module.exports = {

    name:'antialt',
    description:'Enables/Disables Anti Alt Account System',

    async execute(message,args,client){

        if(!message.member.hasPermission('ADMINISTRATOR')) return;
        let option = args[0]
        if(!option) {
            const embed = new MessageEmbed()
            .setTitle("Options for anti alt system")
            .setDescription("`<prefix> antialt enable` To enable the anti-alt system\n`<prefix> antialt disable` To disable the anti-alt system")
            .setColor('RED')
            return message.channel.send(embed)
        }

        if(option.toLowerCase() === 'enable') {

        let logsChannel = message.mentions.channels.first()
        let days = args[2];


        if(!logsChannel) return message.channel.send('Please provide channel for the alt system to display users');
        if(!days) return message.channel.send("Please tell me the minimum age/days requirement of the account")
        if(isNaN(days)) return message.channel.send("Please enter only numbers for the days")
        schema.findOne({Guild:message.guild.id}, async(err, data) =>{
            if(data) return message.channel.send(new MessageEmbed() .setTitle('System Already Enabled')
            .setDescription('Anti Alt System is already turned on') .setColor('BLUE'));

            new Schema({
                Channel:logsChannel,
                Days: parseInt(days),

            }).save()


        })

        const embed = new MessageEmbed()
        .setTitle(":white_check_mark: Enabled Anti Alt System for this server")
        .setColor('GREEN')
        .setDescription(`${message.author.tag} has enabled the anti-alt system!`)
        .setTimestamp()
        return message.channel.send(embed)
     }
    }
}