const {CommandInteraction, Client, MessageEmbed, Util} = require('discord.js')

module.exports = {
    name:'steal-emote',
    description:'Steal Emote from Other Servers',
    permission:'MANAGE_EMOJIS',
    options:[
        {
            name:'emote',
            description:'Emote to steal',
            type:'STRING',
            required:true
        },
        {
            name:'name',
            description:'Set a name for the stolen emote',
            type:'STRING',
            required:true
        }
    ],

       /**
   *
   * @param {Client} client
   * @param {CommandInteracion} interaction
   */

    run: async (client, interaction) => {
        const emoji = interaction.options.getString('emote')
        const name = interaction.options.getString('name') ? interaction.options.getString('name').replace(/[^a-z0-9]/gi, "") : null


        let args = interaction.options.data;

        console.log(args)

        const parsedEmoji = Util.parseEmoji(args[0]?.value)

        console.log(parsedEmoji)
    
        if(parsedEmoji.id){
            const extension = parsedEmoji.animated ? ".gif" : ".png";
            const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;
            console.log(url)
            interaction.guild.emojis.create(url, args[1]?.value)
                .then((emoji) => {
                    const embed = new MessageEmbed()
                        .setTitle('Emoji Added')
                        .setImage(emoji.url)
                        .setDescription(`Emoji **${name.toUpperCase()}** was added`)
                        .setTimestamp()
                        .setColor('RANDOM')
                    interaction.followUp({embeds:[embed]})
                })
        }
    


    }
}