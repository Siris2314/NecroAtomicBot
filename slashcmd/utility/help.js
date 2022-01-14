const {CommandInteraction, Client, MessageEmbed, MessageActionRow, MessageSelectMenu} = require('discord.js')
const fs = require('fs')
const image = `https://cdn.discordapp.com/attachments/867151384703795241/867465639262027776/bot_long_banner.png`
module.exports = {
    name:'help',
    description:'Slash Help Command',

     /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

    run:async (client, interaction) => {

    try{


        const directories = []
        const commands = []

        fs.readdirSync("./slashcmd/").forEach(dir => {
            const command = fs.readdirSync(`./slashcmd/${dir}/`).filter(file => file.endsWith(".js"));


            const categories = dir

            directories.push(categories)

            console.log(command)

            commands.push(command)
            

        })

        const embed = new MessageEmbed()
            .setDescription("Please Select A Category")
            .setImage(image)
            .setThumbnail(client.user.avatarURL({dynamic: true}))
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
                    catEmbed.setTitle(`${directory} :lock:`)
                    catEmbed.setDescription(`List of Commands in ${directory} category`)
                    catEmbed.addFields(
                        commands[0].map((cmd) => {
                            const name = cmd.split('.').slice(0, -1).join('.')
                            const desc = client.slashCommands.get(name)
                            return {
                                name:name,
                                value:desc.description ? desc.description : 'No Description',
                                inline:true
                            }
                        })
                    )
                }
                else if(directory === 'fun'){
                    catEmbed.setTitle(`${directory} :clown:`)
                    catEmbed.setDescription(`List of Commands in ${directory} category, No Description Commands Are Most Likely Context Menus`)
                    catEmbed.addFields(
                        commands[1].map((cmd) => {

                            const name = cmd.split('.').slice(0, -1).join('.')
                            const desc = client.slashCommands.get(name)
                            return {
                                name:name,
                                value:(desc.description) || 'No Description',
                                inline:true
                            }
                        })
                    )

                }
                else if(directory === 'music'){
                    catEmbed.setTitle(`${directory} :musical_note:`)
                    catEmbed.setDescription(`List of Commands in ${directory} category, No Description Commands Are Most Likely Context Menus`)
                    catEmbed.addFields(
                        commands[2].map((cmd) => {

                            const name = cmd.split('.').slice(0, -1).join('.')
                            const desc = client.slashCommands.get(name)
                            return {
                                name:name,
                                value:(desc.description) || 'No Description',
                                inline:true
                            }
                        })
                    )

                }
                else if(directory === 'serversetup') {
                    catEmbed.setTitle(`${directory} :wrench:`)
                    catEmbed.setDescription(`List of Commands in ${directory} category`)
                    catEmbed.addFields(
                        commands[3].map((cmd) => {
                            const name = cmd.split('.').slice(0, -1).join('.')
                            const desc = client.slashCommands.get(name)
                            return {
                                name:name,
                                value:(desc.description) || 'No Description',
                                inline:true
                            }
                        })
                    )
                }
                
                else if(directory === 'utility'){
                    catEmbed.setTitle(`${directory} :tools:`)
                    catEmbed.setDescription(`List of Commands in ${directory} category, No Description Commands Are Most Likely Context Menus`)
                    catEmbed.addFields(
                        commands[4].map((cmd) => {
                            const name = cmd.split('.').slice(0, -1).join('.')
                            const desc = client.slashCommands.get(name)
                            console.log(desc.description);
                            return {
                                name:name,
                                value:desc.description ? desc.description : 'No Description',
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

         } catch(e){
             interaction.channel.send('An error has occured')
         }

    }
}

