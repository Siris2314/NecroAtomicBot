const Discord = require('discord.js');
const Schema = require('../../schemas/autorole');

module.exports = {
    name:'setautorole',
    description:'Sets a system to give role when a user joins',

    async execute(message,args,client){

        const role = message.mentions.roles.first()
        const option = args[1];
        if(!message.member.hasPermission('ADMINSTRATOR')) return message.channel.send('Perms Denied')

        if(!role){
            const error = new Discord.MessageEmbed()
                .setTitle(':x: Set Role Error')
                .setDescription('Failed to Mention a Role')
                .setTimestamp()
        }
        if(!message.guild.roles.cache.get(role.id)){
            const error = new Discord.MessageEmbed()
            .setTitle(':x: Set Role Error')
            .setDescription('Role Does Not Exist')
            .setTimestamp()
        }
        if(!option){
            const embed = new Discord.MessageEmbed()
            .setTitle("Options for auto-role system")
            .setDescription("`<prefix> autorole enable` To enable the auto-role system\n`<prefix> autorole disable` To disable the auto-role system")
            .setColor('RED')
            return message.channel.send(embed)
        }

     if(option.toLowerCase() === 'enable'){

        Schema.findOne({Guild:message.guild.id}, async(err,data) =>{

            if(data) data.Delete();

            new Schema({
                Guild:message.guild.id,
                Role: role.id
            }).save()


            

        })


        const embed = new Discord.MessageEmbed()
        .setTitle(":white_check_mark: Enabled Autorole System")
        .setColor('GREEN')
        .setDescription(`${message.author.tag} has enabled the autorole system!`)
        .setTimestamp()
        return message.channel.send(embed)
    } else if(option.toLowerCase() === 'disable'){
        Schema.findOne({Guild:message.guild.id}, async(err,data) =>{

            if(!data) return message.channel.send('Autorole was never enabled in this server');

            data.Delete()


        })
        const embed = new Discord.MessageEmbed()
        .setTitle(":white_check_mark: Disabled Autorole System")
        .setColor('RED')
        .setDescription(`${message.author.tag} has disabled the autorole system!`)
        .setTimestamp()
        return message.channel.send(embed)



    }
    else{
        const embed = new Discord.MessageEmbed()
        .setTitle(":white_check_mark: Not a valid")
        .setColor('RED')
        .setDescription('Not a valid option, please use either <prefix> setautorole enable to enable this system or <prefix> setautrole disabled to disable this system')
        .setTimestamp()
        return message.channel.send(embed)


    }


    }
}