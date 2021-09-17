const {CommandInteraction, Client, MessageEmbed, MessageActionRow, MessageSelectMenu} = require('discord.js')
const fs = require('fs')
module.exports = {
    name:'help',
    description:'Slash Help Command',

     /**
   *
   * @param {Client} client
   * @param {CommandInteracion} interaction
   */

    run:async (client, interaction) => {


        const directories = []
        const commands = []

        fs.readdirSync("./slashcmd/").forEach(dir => {
            const command = fs.readdirSync(`./slashcmd/${dir}/`).filter(file => file.endsWith(".js"));


            const categories = dir

            console.log(command)
            directories.push(categories)

            commands.push(command)
            

        })

        console.log(directories)


        console.log(commands)


        const embed = new MessageEmbed()
            .setDescription("Please Select A Category")
        const components = (state) => [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                  .setCustomId('help-menu')
                  .setPlaceholder("Please Select a Category")
                  .setDisabled(state) 
                  .addOptions(
                      directories.map((dir)=>{
                            return {
                                label:dir,
                                value:dir,
                                description:`Commands from ${dir} category`
                            }
                      })
                  )

            )
        ]

        const initial = await interaction.followUp({
            embeds: [embed],
            components:components(false)
        })

        const filter = (interaction) => 
            interaction.user.id 


        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            componentType: 'SELECT_MENU',

        })

        collector.on('collect',(interaction) => {
            const [directory] = interaction.values

                const catEmbed = new MessageEmbed()

                if(directory === 'administration'){
                    catEmbed.setTitle(`${directory}`)
                    catEmbed.setDescription(`List of Commands in ${directory} category`)
                    catEmbed.addFields(
                        commands[0].map((cmd) => {
                            const name = cmd.split('.').slice(0, -1).join('.')
                            const desc = client.slashCommands.get(name)
                            console.log(desc)
                            return {
                                name:name,
                                value:desc.description ? desc.description : 'No Description',
                                inline:true
                            }
                        })
                    )
                }
                else if(directory === 'utility'){
                    catEmbed.setTitle(`${directory}`)
                    catEmbed.setDescription(`List of Commands in ${directory} category, No Description Commands Are Most Likely Context Menus`)
                    catEmbed.addFields(
                        commands[1].map((cmd) => {

                            const name = cmd.split('.').slice(0, -1).join('.')
                            const desc = client.slashCommands.get(name)
                            console.log(desc)
                            return {
                                name:name,
                                value:(desc.description) || 'No Description',
                                inline:true
                            }
                        })
                    )

                }
                interaction.update({embeds:[catEmbed]})
        })

        collector.on('end',() => {
            initial.edit({components:components(true)})
        })




        

       






    }
}

