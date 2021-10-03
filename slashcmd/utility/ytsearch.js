const { Client, Message, MessageEmbed } = require("discord.js");
const sr = require("yt-search");
let logo = "https://cdn.discordapp.com/attachments/868172328998146195/892831378515845130/1280px-YouTube_full-color_icon_2017.svg.png";

module.exports = {
    name:'ytsearch',
    description:'Searches for YouTube Channel with Recent Video Uploaded',
    options:[
        {
            name:'query',
            description:'query to search for',
            type:'STRING',
            required:true
        }
    ],
    run: async (client, interaction) => {

        const query = interaction.options.getString('query');
        const search = async (argument) => {
            const Result = await sr(argument);
            return (Result.videos.length > 1) ? Result.videos[0] : null;
        }
        
        const Vid = search(query)
        if (Vid) {
            const Embed = new MessageEmbed()
            .setTitle((await Vid).title)
            .addFields(
                {
                    name: "Duration",
                    value: `${(await Vid).duration.timestamp} Minutes.`,
                    inline: true
                },
                {
                    name: "Created Ago",
                    value: `${(await Vid).ago}.`,
                    inline: true
                },
                {
                    name: "Views",
                    value: `${(await Vid).views} Views.`,
                    inline: true
                }
            )
            .setURL((await Vid).url)
            .setColor("RED").setTimestamp()
            .setImage((await Vid).thumbnail)
            .setAuthor((await Vid).author.name, logo, (await Vid).author.url)
            .setFooter(interaction.user.username)
            .setTimestamp()
            return await interaction.followUp({
                embeds: [Embed]
            })
    }
    else {
        const Embed = new MessageEmbed().setColor("#fcbd8f")
        .setDescription("No videos found! **>.<**")
        return interaction.followUp({
            embeds: [Embed]
        });
    };
}
}