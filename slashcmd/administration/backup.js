const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js')
const backup = require("discord-backup")

module.exports = {
    name: 'backup',
    description: 'Server Backup!',
    permisson:'ADMINISTRATOR',
    options: [{
            name: 'create',
            type: 'SUB_COMMAND',
            description: 'Create Backup',
        },
        {
            name: 'info',
            type: 'SUB_COMMAND',
            description: 'Get a Info About a Backup Id',
            options: [{
                name: 'backup-id',
                type: 'STRING',
                description: 'The backup id you want info about',
                required: true,
            }]
        },
        {
            name: 'load',
            type: 'SUB_COMMAND',
            description: 'Load your Backup',
            options: [{
                name: 'backup-id',
                type: 'STRING',
                description: 'The backup id you want to load',
                required: true,
            }]
        },
        {
            name: 'delete',
            type: 'SUB_COMMAND',
            description: 'Delete a Backup',
            options: [{
                name: 'backup-id',
                type: 'STRING',
                description: 'The backup id you want to delete',
                required: true,
            }]
        }
    ],
    run: async (client, interaction) => {


        if(interaction.user.id != interaction.guild.ownerID){
            interaction.followUp(`Only owner of this server can use this command`)
            throw "Perms Error"
        }
      
        const SubCommand = interaction.options.getSubcommand();

        if (SubCommand === "create") {
            const ConfirmEmbed = new MessageEmbed()
                .setDescription(' Are you sure you want to create a backup!?')
                .setColor('RED')


            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setLabel('Yes')
                    .setStyle('SUCCESS')
                    .setCustomId('backup-yes-create')
                )
                .addComponents(
                    new MessageButton()
                    .setLabel('No')
                    .setStyle('DANGER')
                    .setCustomId('backup-no-create')
                );

            interaction.followUp({
                embeds: [ConfirmEmbed],
                components: [row]
            })

            const collector = await interaction.channel.createMessageComponentCollector({
                time: 15000,
                componentType: "BUTTON",
            })

            collector.on("collect", async (i) => {

                if (i.customId === "backup-yes-create") {

                    if (i.user.id !== interaction.user.id) return i.reply({
                        content: "Don't touch other people's button",
                        ephemeral: true
                    })

                    i.deferUpdate()
                    const ConfirmEmbed1 = new MessageEmbed()
                        .setDescription(' Are you sure you want to create a backup!?')
                        .setColor('RED')


                    const row1 = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setLabel('Yes')
                            .setStyle('SUCCESS')
                            .setCustomId('backup-yes-create')
                            .setDisabled(true)
                        )
                        .addComponents(
                            new MessageButton()
                            .setLabel('No')
                            .setStyle('DANGER')
                            .setCustomId('backup-no-create')
                            .setDisabled(true)
                        );
                    interaction.editReply({
                        embeds: [ConfirmEmbed1],
                        components: [row1]
                    })

                    backup.create(interaction.guild, {
                        jsonBeautify: true,
                        saveImages: "base64",
                        maxMessagesPerChannel: 5,
                    }).then((backupData) => {
                        let guildicon = interaction.guild.iconURL({
                            dynamic: true
                        });
                        let datacreated = new MessageEmbed()
                            .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({
                                dynamic: true
                            }))
                            .setDescription(`New Backup Created\n> **Backup ID**: \`${backupData.id}\`\n> **Guild Name**: ${interaction.guild.name}`)

                            .setColor('RED')
                        interaction.user.send({
                            embeds: [datacreated]
                        });
                        let created = new MessageEmbed()
                            .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({
                                dynamic: true
                            }))
                            .setDescription(`Backup Has Been Created, Check your dms!`)
                            .setColor('RED')


                        interaction.channel.send({
                            embeds: [created]
                        });
                    });

                } else if (i.customId === "backup-no-create") {

                    if (i.user.id !== interaction.user.id) return i.reply({
                        content: "Don't touch other people's button",
                        ephemeral: true
                    })
                    i.deferUpdate()
                    const ConfirmEmbed2 = new MessageEmbed()
                        .setDescription(' Are you sure you want to create a backup!?')
                        .setColor('RED')


                    const row2 = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setLabel('Yes')
                            .setStyle('SUCCESS')
                            .setCustomId('backup-yes-create')
                            .setDisabled(true)
                        )
                        .addComponents(
                            new MessageButton()
                            .setLabel('No')
                            .setStyle('DANGER')
                            .setCustomId('backup-no-create')
                            .setDisabled(true)
                        );
                    interaction.editReply({
                        embeds: [ConfirmEmbed2],
                        components: [row2]
                    })
                    const NoEmbed = new MessageEmbed()
                        .setDescription(`Cancelled The Backup!`)
                        .setColor('RED')

                    interaction.channel.send({
                        embeds: [NoEmbed]
                    })
                }
            })


        } else if (SubCommand === "info") {
            let backupID = interaction.options.getString("backup-id");
            if (!backupID) {
                let notvaild = new MessageEmbed()
                    .setAuthor(interaction.user.username, interaction.user.displayAvatarURL)
                    .setDescription(`> You must specify a valid backup ID `)

                    .setColor('RED')

                return interaction.followUp({
                    embeds: [notvaild]
                });
            }
            backup.fetch(backupID).then((backupInfos) => {
                const date = new Date(backupInfos.data.createdTimestamp);
                const yyyy = date.getFullYear().toString(),
                    mm = (date.getMonth() + 1).toString(),
                    dd = date.getDate().toString();
                const formatedDate = `${yyyy}/${(mm[1] ? mm : "0" + mm[0])}/${(dd[1] ? dd : "0" + dd[0])}`;
                let backups = new MessageEmbed()
                    .setAuthor(interaction.user.username, interaction.user.displayAvatarURL)
                    .setColor('RED')

                    .setDescription(`**Back Up Info**\n> Backup ID: ${backupInfos.id} \n> Server ID: ${backupInfos.data.guildID} \n> Backup Size: ${backupInfos.size} mb \n> Backup Created At: ${formatedDate}`)

                interaction.followUp({
                    embeds: [backups]
                })
            }).catch((err) => {
                let nobackupfound = new MessageEmbed()
                    .setAuthor(interaction.user.username, interaction.user.displayAvatarURL)
                    .setDescription(`> No Backup Found For: \`${backupID}\`!`)

                    .setColor('RED')
                interaction.followUp({
                    embeds: [nobackupfound]
                })
            });

        } else if (SubCommand === "load") {
            // =====================================================================================
            const backupID = interaction.options.getString('backup-id')
            backup.fetch(backupID).then(async () => {

                const eConfirmEmbed = new MessageEmbed()
                    .setDescription(' Are you sure you want to load the back!?\nThis will delete all channels, roles, messages, emojis, bans etc.\nNONE OF THE MEMBERS WILL BE KICKED!')
                    .setColor('RED')


                const erow = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel('Yes')
                        .setStyle('SUCCESS')
                        .setCustomId('backup-yes-load')
                    )
                    .addComponents(
                        new MessageButton()
                        .setLabel('No')
                        .setStyle('DANGER')
                        .setCustomId('backup-no-load')
                    );

                interaction.followUp({
                    embeds: [eConfirmEmbed],
                    components: [erow]
                })

                const collector = await interaction.channel.createMessageComponentCollector({
                    time: 15000,
                    componentType: "BUTTON",
                })

                collector.on("collect", async (i) => {

                    if (i.customId === "backup-yes-load") {

                        if (i.user.id !== interaction.user.id) return i.reply({
                            content: "Don't touch other people's button",
                            ephemeral: true
                        })

                        i.deferUpdate()
                        backup.load(backupID, interaction.guild, {
                            clearGuildBeforeRestore: true
                        }).then(() => {}).catch((err) => {
                            let permissionserorr = new MessageEmbed()
                                .setAuthor(interaction.user.username, interaction.user.displayAvatarURL({
                                    dynamic: true
                                }))
                                .setDescription(`There are 2 possible reasons for this message:\n> 1. I dont have ADMINISTRATOR Permissions\n> 2. I have completed the backup successfully!\n\nIf it is none of them please report this!`)

                                .setColor('RED')

                            interaction.user.send({
                                embeds: [permissionserorr]
                            })
                        });

                    } else if (i.customId === "backup-no-load") {

                        if (i.user.id !== interaction.user.id) return i.reply({
                            content: "Don't touch other people's button",
                            ephemeral: true
                        })
                        i.deferUpdate()
                        const ConfirmEmbed2 = new MessageEmbed()
                            .setDescription(' Are you sure you want to create a backup!?')
                            .setColor('RED')


                        const row2 = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                .setLabel('Yes')
                                .setStyle('SUCCESS')
                                .setCustomId('backup-no-load')
                                .setDisabled(true)
                            )
                            .addComponents(
                                new MessageButton()
                                .setLabel('No')
                                .setStyle('DANGER')
                                .setCustomId('backup-yes-load')
                                .setDisabled(true)
                            );
                        interaction.editReply({
                            embeds: [ConfirmEmbed2],
                            components: [row2]
                        })
                        const NoEmbed = new MessageEmbed()
                            .setDescription(`Cancelled The Backup!`)
                            .setColor('RED')

                        interaction.channel.send({
                            embeds: [NoEmbed]
                        })
                    }
                })
            }).catch((err) => {
                let nobackupfound = new MessageEmbed()
                    .setAuthor(interaction.user.username, interaction.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .setDescription(`No backup found for ${backupID}`)

                    .setColor('RED')

                interaction.followUp({
                    embeds: [nobackupfound]
                })
            });



        } else if (SubCommand === "delete") {
            let backupID = interaction.options.getString("backup-id");
            if (!backupID) {
                let notvaild = new MessageEmbed()
                    .setAuthor(interaction.user.username, interaction.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .setDescription(`You must specify a valid backup ID To Remove`)

                    .setColor('RED')

                interaction.followUp({
                    embeds: [notvaild]
                })
            }
            backup.fetch(backupID).then((backupInfos) => {
                backup.remove(backupID)
                let backups = new MessageEmbed()
                    .setAuthor(interaction.user.username, interaction.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .setDescription(`Backup Deleted!`)

                    .setColor('RED')

                interaction.followUp({
                    embeds: [backups]
                })
            }).catch((err) => {
                let nobackupfound = new MessageEmbed()
                    .setAuthor(interaction.user.username, interaction.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .setDescription(`No backup found!`)

                    .setColor('RED')
                interaction.followUp({
                    embeds: [nobackupfound]
                })
            });

        }

    }
}