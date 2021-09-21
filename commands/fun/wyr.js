const { MessageButton, MessageActionRow } = require("discord.js");
const fetch = require("node-fetch")


module.exports = {

    name:'wyr',
    description:'Would You Rather Game',


    async execute(message, args,client){

            const res = await fetch(`https://api.tovade.xyz/v1/fun/wyr`).then((re) =>
                re.json()
            );

            const row = new MessageActionRow()
            .addComponents(

                new MessageButton()
                        .setCustomId('primary')
                        .setLabel(`${res.questions[0]}`)
                        .setStyle('PRIMARY'),
                new MessageButton()
                        .setCustomId("second")
                        .setLabel(`${res.questions[1]}`)
                        .setStyle("DANGER"),
        );

        message.channel.send({content: "Would You Rather", components:[row]})

        
        const filter = interaction => interaction.customId === 'primary' && interaction.user.id === message.author.id;
        const filter2 = interaction => interaction.customId === 'second' && interaction.user.id === message.author.id;
        const collector = message.channel.createMessageComponentCollector({ filter, time: 60000 });
        const collector2 = message.channel.createMessageComponentCollector({ filter: filter2, time: 60000 });


            collector.on('collect', async(ButtonInteraction) => {

                if(!ButtonInteraction.member.id === message.author.id) return interaction.reply({ content: "Only the author of the button can use this command", ephemeral: true})
                const id = ButtonInteraction.customId
                
                
                if (id === 'primary') {
                    const row2 = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('primary')
                            .setLabel(`${res.questions[0]}: `+ " "+ `${res.percentage["1"]}%`)
                            .setStyle('PRIMARY')
                            .setDisabled(),
                    new MessageButton()
                            .setCustomId("second")
                            .setLabel(`${res.questions[1]}: `+ " "+ `${res.percentage["2"]}%`)
                            .setStyle("SECONDARY")
                            .setDisabled(),
                    );

                    await ButtonInteraction.update({ content: `**Would You Rather**`, components: [row2] });
                }
                    
                
            })

            collector2.on('collect', async(ButtonInteraction) => {

                if(!ButtonInteraction.member.id === message.author.id) return interaction.reply({ content: "Only the author of the button can use this command", ephemeral: true})
                const id = ButtonInteraction.customId

                if (id === 'second') {
                    const row2 = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('primary')
                            .setLabel(`${res.questions[0]}: `+ " "+ `${res.percentage["1"]}%`)
                            .setStyle('SECONDARY')
                            .setDisabled(),
                    new MessageButton(`${res.questions[1]}: `+ " "+ `${res.percentage["2"]}%`)
                            .setCustomId("second")
                            .setLabel()
                            .setStyle("DANGER")
                            .setDisabled(),
                    );
                    await ButtonInteraction.update({ content: `**Would You Rather**`, components: [row2] });
                }
            });



    }





}