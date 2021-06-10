const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: 'vcban',
  description:'Bans members from joining vc',
 
  async execute(message, args,client){
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send('Perms denied');
    const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!target) return message.channel.send('Please tell me the member who should be prevented from joining the vc');

    if(target.id === message.author.id) return message.channel.send('You cannot anti-vc yourself!')

    if(message.member.roles.highest.position <= target.roles.highest.position) return message.channel.send("You're role is not higher than the member.")

    let role = message.guild.roles.cache.find((role) => role.name.toLowerCase() === 'antivc');
    if(!role) {
        try {
            message.channel.send('antivc role not found! Attempting to create one!');
            role = await message.guild.roles.create({
                data: {
                    name: 'antivc',
                    permissions: []
                }
            })

            message.guild.channels.cache.filter((c) => c.type === 'voice')
            .forEach(async (channel) => {
                await channel.createOverwrite(role, {
                    VIEW_CHANNEL: true,
                    CONNECT: false
                })
            })

            message.channel.send('Role Has been Created!')
        } catch (error) {
            return message.channel.send(`Error Occured : \`${error.message}\``);
        }
    }
    await target.roles.add(role.id);
    const embed = new MessageEmbed()
     .setTitle('Member banned from VC')
     .setDescription(`${target.displayName} is now unable to connect to VC`)
     .setThumbnail(message.mentions.users.first().displayAvatarURL({dynamic:true}))
     .setColor("RANDOM")
     .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
     .setTimestamp()
    return message.channel.send(embed)
  }
}