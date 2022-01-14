const {Client, CommandInteraction, MessageEmbed} = require('discord.js');

module.exports = {
    name: 'seticon',
    description: 'Set the icon of the server',
    permission:'ADMINISTRATOR',
    options: [
        {
            name: 'icon',
            description: 'The icon to set',
            type:'STRING',
            required:true
        }
    ],

    run:async(client,interaction) => {
        const id = interaction.guild.ownerId;

        if(!id){
            const embed = new MessageEmbed()
                .setTitle('Permission Error')
                .setDescription('Only Owner of Server Can Change the Server Icon')
                .setColor('RED')
                .setTimestamp()

            return interaction.followUp({embeds:[embed]})
        }
        else{
            const icon = interaction.options.getString('icon')
            interaction.guild.setIcon(icon);

            const newicon = new MessageEmbed()
                .setTitle('Icon Changed')
                .setImage(icon)
                .setTimestamp()
            
            return interaction.followUp({embeds:[newicon]})

            
        }
    }
}