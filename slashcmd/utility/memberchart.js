const { CommandInteraction,Client, MessageAttachment, MessageEmbed } = require("discord.js");
const { ChartJSNodeCanvas } = require("chartjs-node-canvas") 
const fs = require("fs");

const width = 600
const height = 600
module.exports = {
    name:'memberchart',
    description:'Shows a chart of the members in the server',
    run: async (client, interaction) => {
        const bots = interaction.guild.members.cache.filter(x => x.user.bot === true).size
        const members = interaction.guild.members.cache.filter(x => x.user.bot === false).size

        const canvas = new ChartJSNodeCanvas({ width, height, backgroundColour: 'white', })

        const config = {
            labels: [
                `Members ${members}`,
                `Bots ${bots}`,
            ],
            datasets: [{
                label: `Member Distribution in ${interaction.guild.name}`,
                data: [members, bots],
                backgroundColor: [
                    '#c7f774',
                    '#fc7878'
                ],
                borderColor: '#000000'

            }]
        }

        const data = {
            type: 'pie',
            data: config,
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: `Members in ${interaction.guild.name}`,
                        padding: {
                            top: 10,
                            bottom: 20
                        }
                    }
                }
            }
        };

        const image = await canvas.renderToBuffer(data)
        await fs.writeFileSync('assets/graphic.png', image);


        const file = new MessageAttachment('./assets/graphic.png');

        const exampleEmbed = new MessageEmbed()
            .setTitle(`Member Distribution in ${interaction.guild.name}`)
            .setImage('attachment://grafica.png')
            .setColor('BLACK')
            .setDescription(`**Members: \`${members}\`ㅤㅤㅤㅤㅤBots: \`${bots}\`**`)

        interaction.followUp({ embeds: [exampleEmbed], files: [file] });
    }
}