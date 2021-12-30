const { MessageButton, MessageActionRow } = require("discord.js");
const fetch = require("node-fetch")


module.exports = {

    name:'wyr',
    description:'Would You Rather Game',


    async execute(message, args,client){


        try{

            const res = await fetch("http://api.xaliks.xyz/random/wyr").then((re) =>
                re.json()
            );

        

            const row = new MessageActionRow()
            .addComponents(

                new MessageButton()
                        .setCustomId('primary')
                        .setLabel(`${res.questions[0].question}`)
                        .setStyle('PRIMARY'),
                new MessageButton()
                        .setCustomId("second")
                        .setLabel(`${res.questions[1].question}`)
                        .setStyle("DANGER"),
        );

        message.channel.send({content: "Would You Rather", components:[row]})

        
        const filter = interaction => interaction.customId === 'primary' && interaction.user.id === message.author.id;
        const filter2 = interaction => interaction.customId === 'second' && interaction.user.id === message.author.id;
        const collector = message.channel.createMessageComponentCollector({ filter, time: 60000 });
        const collector2 = message.channel.createMessageComponentCollector({ filter: filter2, time: 60000 });

``
            collector.on('collect', async(ButtonInteraction) => {

                if(!ButtonInteraction.member.id === message.author.id) return interaction.reply({ content: "Only the author of the button can use this command", ephemeral: true})
                const id = ButtonInteraction.customId
                
                
                if (id === 'primary') {
                    const row2 = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('primary')
                            .setLabel(`${res.questions[0].question}: `+ " "+ `${res.questions[0].percentage}%`)
                            .setStyle('PRIMARY')
                            .setDisabled(),
                    new MessageButton()
                            .setCustomId("second")
                            .setLabel(`${res.questions[1].question}: `+ " "+ `${res.questions[1].percentage}%`)
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
                            .setLabel(`${res.questions[0].question}: `+ " "+ `${res.questions[0].percentage}%`)
                            .setStyle('SECONDARY')
                            .setDisabled(),
                    new MessageButton()
                            .setCustomId("second")
                            .setLabel(`${res.questions[1].question}: `+ " "+ `${res.questions[1].percentage}%`)
                            .setStyle("DANGER")
                            .setDisabled(),
                    );
                    await ButtonInteraction.update({ content: `**Would You Rather**`, components: [row2] });
                }
            });``

        } catch(err){
            message.channel.send('API Timed Out');
        }



    }





}