const { CommandInteraction, Client, MessageEmbed} = require('discord.js');
const Schema = require('../../schemas/custom-welcome.js')

module.exports = {
    name:'welcomebanner',
    description:'Sets a custom welcome banner system in the server',
    permission:'ADMINISTRATOR',
    options:[
        {
            name:'choice',
            description:'Turn on or off the welcome banner system.',
            type:'STRING',
            required: true,
            choices: [
                {
                  name: "enable",
                  value: "enable",
                },
                {
                  name: "disable",
                  value: "disable",
                },
              ],
        },
        {
            name:'channel',
            description:'The channel to send the welcome banner to.',
            type:'CHANNEL',
            required: true
        },
        {
            name:'background',
            description:'The background image of the welcome banner.',
            type:'STRING',
            required: true

        },
        {
            name: 'greetings',
            description:'The Greeting Message On The Banner',
            type:'STRING',
            required: true
        },
        {
            name:'message',
            description:'The Message Below The Banner',
            type:'STRING',
            required: false
        },
        {
            name:'greetcolor',
            description:'The Hex Color Of The Greeting Message',
            type:'STRING',
            required: false
        },
        {
            name:'namecolor',
            description:'The Hex Color Of The Username',
            type:'STRING',
            required: false
        },
        {
            name:'avatarcolor',
            description:'The Hex Color Of The Avatar',
            type:'STRING',
            required: false
        },
        {
            name:'messagecolor',
            description:'The Hex Color Of The Message',
            type:'STRING',
            required: false
        },
        {
            name:'font',
            description:'The Font Of The Message',
            type:'STRING',
            required: false,
            choices: [
                {
                    name: "gotham",
                    value: "gotham",
                },
                {
                    name:'stoneserif',
                    value:'stoneserif',
                },
                {
                    name:'roboto',
                    value:'roboto',

                },
                {
                    name:'arial',
                    value:'arial',
                },
                {
                    name:'impact',
                    value:'impact',
                },
                {
                    name:'riffic',
                    value:'riffic',
                },
                {
                    name:'minecraft',
                    value:'minecraft',
                },
                {
                    name:'pinkycupid',
                    value:'pinkycupid',
                },
                {
                    name:'paladins',
                    value:'paladins',
                },
                {
                    name:'pokemon',
                    value:'pokemon',
                },
                {
                    name:'oldenglish',
                    value:'oldenglish',
                },
                {
                    name:'chalkduster',
                    value:'chalkduster',
                },
                {
                    name:'akbar',
                    value:'akbar',
                },
                {
                    name:'nexa',
                    value:'nexa',
                },
                {
                    name:'verdana',
                    value:'verdana',
                },
                {
                    name:'typewriter',
                    value:'typewriter',
                },
                {
                    name:'spongebob',
                    value:'spongebob',
                },
                {
                    name:'cornerofthesky',
                    value:'cornerofthesky',
                },
                {
                    name:'breesh',
                    value:'breesh',
                }


            ],
        }

    ],

    run: async (client, interaction) => {
        let args = interaction.options.data;
        let choice = args[0]?.value;
        let font = args[9]?.value;

        const channel = interaction.options.getChannel('channel');
        const background = interaction.options.getString('background');
        const greetings = interaction.options.getString('greetings');
        const message = interaction.options.getString('message');
        const greetcolor = interaction.options.getString('greetcolor');
        const namecolor = interaction.options.getString('namecolor');
        const avatarcolor = interaction.options.getString('avatarcolor');
        const messagecolor = interaction.options.getString('messagecolor');

        if(choice == "enable"){
           await Schema.findOne({ Guild: interaction.guild.id}, async (err, data) => {
               if(data){
                   return interaction.followUp({content:`Welcome Banner System Already Enabled`})
               }
               else{
                new Schema({
                    Guild:interaction.guild.id,
                    Channel:channel.id,
                    Background:background,
                    Greetings:greetings,
                    Message:message,
                    GreetColor:greetcolor,
                    NameColor:namecolor,
                    AvatarColor:avatarcolor,
                    messageColor:messagecolor,
                    font:font
                    
                }).save()


                const embed = new MessageEmbed()
                 .setTitle('Welcome Banner System Enabled')
                 .setDescription(`Welcome Banner System Has Been Enabled In ${channel}, with background image: `)
                 .setColor(client.color.aquamarine)
                 .setImage(background)

                interaction.followUp({embeds:[embed]})
               }
           })
        }
        else if(choice == "disable"){
            await Schema.findOne({ Guild: interaction.guild.id}, async (err, data) => {
                if(data){
                    data.delete()
                    return interaction.followUp({content:`Welcome Banner System Has Been Disabled`})
                }
                else{
                    return interaction.followUp({content:`Welcome Banner System Already Disabled`})
                }
            })

        }
    }
}