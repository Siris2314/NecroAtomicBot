const menus = require('../../schemas/buttonrr');
const {MessageActionRow, MessageButton} = require('discord.js')
module.exports = {
        name:'buttonmenu',
        description:'Guild Reaction Role Manager',
        permission:'MANAGE_SERVER',
        options:[
            {
                name:'create',
                type:1,
                description:'Create a new role menu',
                options:[{
                    name:'name',
                    description:'Name of role menu',
                    type:3,
                    required:true
                }]
            },
            {
                name:'remove',
                type:1,
                description:'Remove a new role menu',
                options:[{
                    name:'name',
                    description:'Name of role menu',
                    type:3,
                    required:true
                }]
            },
            {
                name:'start',
                type:1,
                description:'Start a new role menu',
                options:[{
                    name:'name',
                    description:'Name of role menu',
                    type:3,
                    required:true
                },{
                    name:'channel',
                    description:"Channel to put menu in",
                    type:7,
                    required:true
                }
            ]

            },
            {
                name:'add-role',
                type:1,
                description:'Add a role in reaction role menu',
                options:[{
                    name:'name',
                    description:'Name of role menu',
                    type:3,
                    required:true
                },{
                    name:'role',
                    description:'Role to add',
                    type:8,
                    required:true
                }]

            },
            {
                name:'remove-role',
                type:1,
                description:'Remove a role in reaction role menu',
                options:[{
                    name:'name',
                    description:'Name of role menu',
                    type:3,
                    required:true
                },{
                    name:'role',
                    description:'Role to remove',
                    type:8,
                    required:true
                }]

            },
            
            

        ],

        run: async (client, interaction) => {
            // await interaction.reply({content: `${client.user.username} is pondering....`})

            const option = interaction.options.getSubcommand(true).toLowerCase();

            const name = interaction.options.getString('name')?.toLowerCase()?.trim();
            const menu = await menus.findOne({name, guild:interaction.guild.id});
            const curr = interaction.guild.me.roles.highest.position;
            const role = interaction.options.getRole('role');
            const channel = interaction.options.getChannel('channel');

            if(option === 'create'){
                if(menu){
                    return interaction.editReply({content:`Role Menu is already with that name, please make a new one with a different name`})
                }

                await menus.create({guild:interaction.guild.id,name, message:0});

                interaction.editReply({content:`Role Menu created with name: \`${name}\``})



            }
            else if(option === 'remove'){
                if(!menu){
                    return interaction.editReply({content:`Role Menu does not exist with that name`})
                }

                await menus.findOneAndDelete({guild:interaction.guild.id, name});

                interaction.editReply({content:`Role Menu removed with name: \`${name}\``})

            }
            else if(option === 'start'){
               if(menu.roles.length === 0){
                   return interaction.editReply({content:`Role Menu does not have any roles`})
               }

               let content = `Reaction Menu : **${menu.name}**\n\nReact to get yourself this role\n\n`;
               let rows = [new MessageActionRow()];
               let index = 0;

               menu.roles.forEach((v, i) => {

                content += `> ${interaction.guild.emojis.cache.get(v.emoji)?.toString() || v.emoji} : \`${interaction.guild.roles.cache.get(v.role).name}\`\n\n`;

                index = parseInt(i/5);
                const button = new MessageButton({
                    customId:`reaction_role_menu`,
                    style:'PRIMARY',
                    emoji:v.emoji

                })

                rows[index] ? rows[index].addComponents(button) : rows[index] = new MessageActionRow().addComponents(button);

               })

               const msg = await channel.send({content, components:rows})
               
               interaction.editReply({content:`Reaction Menu has been made in ${channel}`});
            }
            else if(option == 'add-role'){
                if(!menu) return interaction.editReply({content:`Role Menu does not exist with that name`});

                if(role.position >= curr){
                    return interaction.editReply({content:`Role is higher than my role, thus I cannot give the role`})
                }

                const msg = await interaction.channel.send({content:`React with the emoji you want for this role`});

                const reactions = await msg.awaitReactions({
                    errors:['time'],
                    filter: (reaction, user) => user.id === interaction.user.id, 
                    max:1,
                    time:300000
                }).catch(err => {})


                const emoji = reactions.first()?.emoji

                if(!emoji) return interaction.editReply({content:`You didn't react in time`});

                if(menu.roles.some(v=>v.role === v.role.id) || menu.roles.some(v=>v.emoji === emoji.id || v.emoji === emoji.name)){
                    return interaction.editReply({content:`Role is already in the menu`})
                }

                menu.roles.push({role:role.id, emoji:emoji.id || emoji.name});

                await menus.findOneAndUpdate({name, guild:interaction.guild.id}, {roles:menu.roles});

                interaction.editReply({content:`Added Role \`${role.name}\` with emoji: ${emoji.toString()} for menu: \`${menu.name}\``})
                await msg.delete();
            }
            else if(option == 'remove-role'){
                if(!menu) return interaction.editReply({content:`Role Menu does not exist with that name`});
                if(!menu.roles.some(v=>v.role === role.id)) return interaction.editReply({content:`Role is not in the menu`});

                menu.roles = menu.roles.filter(v=>v.role !== role.id);

                await menus.findOneAndUpdate({name, guild:interaction.guild.id}, {roles:menu.roles});


                interaction.editReply({content:`Removed Role \`${role.name}\` from menu: \`${menu.name}\``})
            }



        }
    
}