const fetch = require('node-fetch');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    name: "genshinartifacts",
    description: "Returns Artifacts from Genshin Impact",
    async execute(message, args, client) {

        let name = args[0]

        const errorEmbed = new Discord.MessageEmbed()
            .setColor('#00FFFF')
            .setTitle('Incorrect Usage <:paimon:927534293515911178>')
            .setDescription('To use the command correctly do \n `\ !necro genshinartifactions {artifact_name} \`')
            .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU1VIMxlog-aJsdR3Vk770oxvJx7baqzfS0vzp3Ujcr_KWMHj4gKc9Vh9jWojnp8WrwcU&usqp=CAU")
            .setImage("https://cdn2.steamgriddb.com/file/sgdb-cdn/grid/c2904ed6cfa731edd18d8ffe285b6695.png")
            .setTimestamp();

        if (!name) return message.channel.send({ embeds: [errorEmbed] })

        const rlname = name.toLowerCase()

        let Arti_Data = []
        let D_artifact = await fetch(`https://api.genshin.dev/artifacts/${name}/`)
        let I_artifact = `https://api.genshin.dev/artifacts/${rlname}/flower-of-life.png`
        let data = await D_artifact.json();

        if (!data.name) return message.channel.send("Incorrect artifact name");

        Arti_Data.push({
            artiname: data.name.toLocaleString(),
            rarity: data.max_rarity.toLocaleString(),
            bonus2: data["2-piece_bonus"].toLocaleString(),
            bonus4: data["4-piece_bonus"].toLocaleString(),
            image: I_artifact.toString(),
        })

        const artiEmbed = new MessageEmbed()
            .setTitle(`Genshin Impact - ${Arti_Data[0].artiname}`)
            .setDescription("Genshin impact artifact info")
            .addFields(
                { name: `Rarity`, value: `${Arti_Data[0].rarity} ⭐`, inline: true },
                { name: `2 Piece Bonus`, value: `${Arti_Data[0].bonus2}`, inline: true },
                { name: `4 Piece Bonus`, value: `${Arti_Data[0].bonus4}`, inline: true },
            )
            .setThumbnail(`${Arti_Data[0].image}`)
            .setTimestamp()

        message.channel.send({ embeds: [artiEmbed] })
    }
}