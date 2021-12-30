const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");

module.exports = {
    name: "advban",
    description: "Bans a user",
    permissions: ['BAN_MEMBERS'],
    options: [
        {
            name: 'in-guild',
            description: 'Bans users who are in the guild',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'user',
                    description: 'the user to ban',
                    required: true,
                    type: 'USER'
                },
                {
                    name: 'reason',
                    description: 'the reason of the ban',
                    required: true,
                    type: 'STRING'
                }
            ]
        },
        {
            name: 'out-guild',
            description: 'Bans userd outside of the guild',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'user-id',
                    description: 'user id to ban (user id only!)',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'reason',
                    description: 'the reason of the ban',
                    required: true,
                    type: 'STRING'
                }
            ]
        }
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */
    run: async (client, interaction) => {
        const subcommand = interaction.options.getSubcommand();
        if(subcommand === 'in-guild') {
            let member = interaction.options.getMember('user')
            const reason = interaction.options.getString('reason')
            try {
            if (member === interaction.member.id) return interaction.followUp({ content: `You can\`t ban yourself!`, ephemeral: true});
      if (
        interaction.member.roles.highest.position <= member.roles.highest.position
      ) return interaction.followUp({ content: "You cant ban that member since they are having a role which is higher than your role!", ephemeral: true});
      
      if (
        interaction.guild.me.roles.highest.position <= member.roles.highest.position
      ) return interaction.followUp({content: "I cant ban that member since they are having a role which is higher than my role!", ephemeral: true});
        const e = new MessageEmbed()
        e.setDescription(`Are you sure you want to ban ${member.user.username}?`)
        e.setColor('BLUE')
        const components = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId('YES')
            .setLabel('Yes')
            .setStyle('SUCCESS'),

            new MessageButton()
            .setCustomId('NO')
            .setLabel('No')
            .setStyle('DANGER')
        )
        const msg = await interaction.followUp({embeds: [e], components: [components], fetchReply: true})
        const filter = (i) => i.user.id === interaction.user.id
        const collector = msg.channel.createMessageComponentCollector({
          filter,
          time: 20000,
        })
        const e2 = new MessageEmbed()
        e2.setDescription(`:white_check_mark: | ${member.user.username} has been banned`)
        e2.setColor('GREEN')

        const e3 = new MessageEmbed()
        e3.setDescription(':x: | Action was canceled!')
        e3.setColor('RED')
        collector.on('collect', async (i) => {
          if(i.customId === 'YES') {
            interaction.editReply({embeds: [e2], components: []})
            await member.ban({reason: reason}).then((m) => {
              try {
                member.send({content: `You have been banned in ${i.guild.name}\nReason: ${reason}\nResponsible Moderator: ${i.user.id}`})
              } catch {
                return
              }
              collector.stop('success')
            })
          } else if(i.customId === 'NO') {
            interaction.editReply({embeds: [e3], components: []})
            collector.stop('success')
          }
        })
        const e4 = new MessageEmbed()
        e4.setDescription('You took too much time! timed out')
        e4.setColor('RED')
        collector.on('end', async (ignore, error) => {
          if(error && error !== 'success') {
            interaction.editReply({embeds: [e4], components: []})
          }
          collector.stop('success')
        })
      
        } catch (err) {
          console.log(err)
        }
        } else if(subcommand === 'out-guild') {
        let member = interaction.options.getString('user-id')
        let reason = interaction.options.getString('reason')
        const user = await client.users.fetch(member)
        if(!user) {
          interaction.followUp({
            embeds: [
              new MessageEmbed()
              .setDescription('There is no user with this user id!')
              .setColor('RED')
            ]
          })
        }
        const e = new MessageEmbed()
        e.setDescription(`Are you sure you want to ban ${user.username}?`)
        e.setColor('BLUE')
        const components = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId('YES')
            .setLabel('Yes')
            .setStyle('SUCCESS'),

            new MessageButton()
            .setCustomId('NO')
            .setLabel('No')
            .setStyle('DANGER')
        )
        const msg = await interaction.followUp({embeds: [e], components: [components], fetchReply: true})
        const filter = (i) => i.user.id === interaction.user.id
        const collector = msg.channel.createMessageComponentCollector({
          filter,
          time: 20000,
        })
        const e2 = new MessageEmbed()
        e2.setDescription(`:white_check_mark: | ${user.username} has been banned`)
        e2.setColor('GREEN')

        const e3 = new MessageEmbed()
        e3.setDescription(':x: | Action was canceled!')
        e3.setColor('RED')
        collector.on('collect', async (i) => {
          if(i.customId === 'YES') {
            interaction.editReply({embeds: [e2], components: []})
            await interaction.guild.members.ban(user, {reason: reason}).then((m) => {
              try {
                user.send({content: `You have been banned in ${i.guild.name}\nReason: ${reason}\nResponsible Moderator: ${i.user.id}`})
              } catch {
                return
              }
              collector.stop('success')
            })
          } else if(i.customId === 'NO') {
            interaction.editReply({embeds: [e3], components: []})
            collector.stop('success')
          }
        })
        const e4 = new MessageEmbed()
        e4.setDescription('You took too much time! timed out')
        e4.setColor('RED')
        collector.on('end', async (ignore, error) => {
          if(error && error !== 'success') {
            interaction.editReply({embeds: [e4], components: []})
          }
          collector.stop('success')
        })
        }
}
}