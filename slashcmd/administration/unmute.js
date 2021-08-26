const {CommandInteraction, Client, MessageEmbed} = require('discord.js')
const Schema = require('../../schemas/mute')
module.exports = {
    name:'unmute',
    description: 'unmutes users',
    permission: 'ADMINISTRATOR',
    options: [

        {

            name:'target',
            description:'Select who you want to unmute',
            type:'USER',
            required:true


        },
    ],

         /**
             *
             * @param {Client} client
             * @param {CommandInteracion} interaction
             */




        run: async (client, interaction) => {
            const Target = interaction.options.getMember('target')
            if(!Target) return interaction.followUp({content:'Member is not found.'})
            const role = interaction.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

           
            Schema.findOne({
                Guild:interaction.guild.id
            },
    
            async(err, data) => {
                if(!data) return interaction.followUp({content:"Member was not muted"})
    
                const user = data.Users.findIndex((prop) => prop === Target.id)
    
                if(user == -1 ) return interaction.followUp({content:"Member is not muted"})
    
                data.Users.splice(user,1);
    
                data.save()
                await Target.roles.remove(role)
    
                interaction.followUp({content:`${Target.displayName} has been unmuted`})
            })
    







        }
}
