const {CommandInteraction, Client, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js')
const { ButtonPaginator } = require('@psibean/discord.js-pagination');

module.exports = {
    name:'queue',
    description:'Returns Queue of Music In Current Channel',


    run: async (client, interaction) => {
        const vc = interaction.member.voice.channel
        if(!vc) return interaction.followUp({content:'Must be in VC to use command'})
        let queue = client.player.getQueue(interaction.guild.id);
        if(!queue) return interaction.followUp({content:`No Songs Playing in ${vc}`})

        const pages = [];
        const arr = queue.songs

        const len = queue.songs.length 

        if(len == 0){
            return interaction.followUp({content:`No Songs Playing in ${vc}`});
        }

        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('pause')
                .setLabel('⏸')
                .setStyle('DANGER')
                .setDisabled(false),
            new MessageButton()
                .setCustomId('resume')
                .setLabel('▶')
                .setStyle('PRIMARY')
                .setDisabled(false),
            new MessageButton()
                .setCustomId('skip')
                .setLabel('⏭')
                .setStyle('PRIMARY')
                .setDisabled(false),

        )


        const channel = client.channels.cache.get(interaction.channelId)
        const filter = (interaction) => {
            if(interaction.user.id) return true;

            return interaction.reply({content:'You cannot use this button'})
        }

        const collector = channel.createMessageComponentCollector({
            filter: filter,
            max: 1
        })


        collector.on("end", (ButtonInteraction) => {
            const id = ButtonInteraction.first().customId

            if(id == "pause") {

                queue.setPaused(true);
            }
            else if(id == "resume") {
                queue.setPaused(false);
            }
        })


        let fullqueue =  arr.map((song,id) =>
        `**${id + 1}**. ${song.name} - \`${song.duration}\``
        ).join("\n");

     

    
     if(len < 31){
        const embed = new MessageEmbed() 
        .setTitle(`Queue in **${interaction.guild.name}**`)
        .setDescription(fullqueue)
        .setFooter(queue.nowPlaying.name)
        .setColor("#F0EAD6")
    
        interaction.followUp({embeds:[embed], components:[row]})
    }
    else{



        const newarr2  = arr.slice(0,20);
        const newarr = arr.slice(20,51);
        const newarr3 = arr.slice(51, 82);



      
        let fullqueue2 =  newarr2.map((song,id) =>
        `**${id + 1}**. ${song.name} - \`${song.duration}\``
        ).join("\n");

        let fullqueue3 =  newarr.map((song,id) =>
        `**${id + 1}**. ${song.name} - \`${song.duration}\``
        ).join("\n");

        let fullqueue4 =  newarr3.map((song,id) =>
        `**${id +   1}**. ${song.name} - \`${song.duration}\``
        ).join("\n");




        const newembed2 = new MessageEmbed()
            .setTitle(`Queue in **${interaction.guild.name}**`)
            .setDescription(fullqueue2)
            .setFooter(queue.nowPlaying.name)
            .setColor("#F0EAD6")

        const newembed = new MessageEmbed()
            .setTitle(`2nd Page of Queue in **${interaction.guild.name}**`)
            .setDescription(fullqueue3)
            .setFooter(queue.nowPlaying.name)
            .setColor("#F0EAD6")

        const newembed3 = new MessageEmbed()
            .setTitle(`3rd Page of Queue in **${interaction.guild.name}**`)
            .setDescription(fullqueue4)
            .setFooter(queue.nowPlaying.name)
            .setColor("#F0EAD6")


        pages.push(newembed2);
        pages.push(newembed);
        pages.push(newembed3);

        interaction.followUp('Showing Page Queue.......')
        const buttonPaginator = new ButtonPaginator(interaction, {pages});
        await buttonPaginator.send();

        



        

    }
}
}