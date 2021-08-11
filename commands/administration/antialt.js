const {Client, Message, MessageEmbed} = require('discord.js');
const schema = require('../../schemas/anti-alt');

module.exports = {

    name:'antialt',
    description:'Enables/Disables Anti Alt Account System',
    usage:'<prefix> anti-invite enable/disable, if enable you need to mention the days,ban/kick,channel to send ban/kick/warn log to, these must be done in the order given',

    async execute(message,args,client){

    if(!message.member.permissions.has('ADMINISTRATOR')) return;
    let option = args[0]
    if(!option) {
            const embed = new MessageEmbed()
            .setTitle("Options for anti alt system")
            .setDescription("`<prefix> antialt enable` To enable the anti-alt system\n`<prefix> antialt disable` To disable the anti-alt system")
            .setColor('RED')
            return message.channel.send({embeds:[embed]})
        }

    if(option.toLowerCase() === 'enable') {

        let days = args[1];
        let choice = args[2];
        let channel = message.mentions.channels.first();


        if(!choice) return message.channel.send({content:"Please provide the action to take when alt detected, **ban** or **kick** or **warn** "})

        if(!channel) return message.channel.send({content:"Please provide a channel for me to give a log of the alt account"})

      
        if(!days) return message.channel.send({content:"Please tell me the minimum age/days requirement of the account"})
        if(isNaN(days)) return message.channel.send({content:"Please enter only numbers for the days"})
        schema.findOne({Guild:message.guild.id}, async(err, data) =>{
            if(data) return message.channel.send({content:"Anti-Alt System Already Active"})

            new schema({
                Guild:message.guild.id,
                Option:choice,
                Channel: channel.id,
                Days: days,

            }).save()


        })

        const embed = new MessageEmbed()
            .setTitle(":white_check_mark: Enabled Anti Alt System for this server")
            .setColor('GREEN')
            .setDescription(`${message.author.tag} has enabled the anti-alt system!`)
            .setTimestamp()
        return message.channel.send({embeds:[embed]})
     }
     else if(option.toLowerCase() === 'disable'){
        schema.findOne({Guild:message.guild.id}, async(err, data) =>{

            if(!data) return message.channel.send({content:'Anti Alt was never enabled in this server'});

            data.delete();


        })

        const embed = new MessageEmbed()
        .setTitle(":white_check_mark: Disabled Anti Alt System for this server")
        .setColor('RED')
        .setDescription(`${message.author.tag} has disabled the anti-alt system!`)
        .setTimestamp()
        return message.channel.send({embeds:[embed]})

     }
     else{
        return message.channel.send({content:"Invalid option, please use <prefix> antialt enable/disable to enable or disable the anti-alt system"})

     }  
    }
}