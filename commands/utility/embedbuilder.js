const { MessageEmbed} = require('discord.js')

module.exports = {
    name:'embedbuilder',
    description:'Builds Embeds',

    async execute(message, args,client){


            const embed = new MessageEmbed()

            if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Invalid Perms")
            message.channel.send("Welcome To Necro Embed Builder, which channel would you like to have your embed built in: ");
            let channel = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
                max:1
            })
            message.channel.send("Please provide the title of the embed") 

            let title = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
                    max:1
            });

            if(title.first().content.toLowerCase() === 'none'){
                embed.setTitle(" ")
            } else{
                embed.setTitle(title.first().content)
            }

            message.channel.send("Please provide a description of the embed")

            let description = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
                max:1
            });


            if(description.first().content.toLowerCase() === 'none'){
                embed.setDescription(" ")
            } else{
                embed.setDescription(description.first().content)
            }

            message.channel.send("Please provide a footer of the embed")

            let footer = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
                max:1
            });

            if(footer.first().content.toLowerCase() === 'none'){
                embed.setFooter(" ")
            } else{
                embed.setFooter(footer.first().content)
            }

            message.channel.send("Please provide a color for the embed(This a required field)")
            let color = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
                max:1
            });

            embed.setColor(color.first().content.toUpperCase())


            message.channel.send("Do you want to put a timestamp in the footer?(Yes/No Option)")
            let timestamp = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
                max:1
            });

            if(timestamp.first().content.toLowerCase() === 'yes'){
                embed.setTimestamp()
            }
            else if(timestamp.first().content.toLowerCase() === 'no'){
                embed.setFooter(footer.first().content)
            }

            message.channel.send("What will the thumbnail of the embed be")
            let thumbnail = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
                max:1
            });


            if(thumbnail.first().content.toLowerCase() === 'none'){
                embed.setDescription(description.first().content)
            }
            else{
                embed.setThumbnail(thumbnail.first().content)
            }

            message.channel.send("What will the image be of the embed(must be a URL)")
            let image = await message.channel.awaitMessages(msg => msg.author.id == message.author.id, {
                max:1
            });

            if(image.first().content.toLowerCase() === 'none'){
                embed.setDescription(description.first().content)
            }
            else{
                embed.setImage(image.first().content)
            }


            channel.first().mentions.channels.first().send(embed).catch((err) => {
                message.channel.send('Empty Embed')
                console.log(err);
            })





            


            

            


            






    }





}