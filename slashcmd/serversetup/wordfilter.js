const schema = require('../../schemas/FilterDB')
const { CommandInteraction, Client, MessageEmbed} = require('discord.js');
const sourcebin = require('sourcebin')

module.exports = {
    name:'wordfilter',
    description:'Word Filter System',
    permission:'MANAGE_MESSAGES',
    options:[
        {
            name:'clear',
            description:'Clear all words',
            type: 'SUB_COMMAND',
        },
        {
            name:'list',
            description:'List all words in word filter system',
            type: 'SUB_COMMAND',
        },
        {
            name:'settings',
            description:'Setup Word Filtering System',
            type:'SUB_COMMAND',
            options:[
                {
                    name:"logger",
                    description:"Sets Logging Channel for Word Filter System",
                    type:"CHANNEL",
                    channelTypes:["GUILD_TEXT"],
                    required:true
                }
            ]
        },
        {
            name:'config',
            description:'Configure Word Filter System via Adding or Removing Words',
            type:'SUB_COMMAND',
            options:[
                {
                    name:'options',
                    description:'Select an Option',
                    type:'STRING',
                    required:true,
                    choices:[
                        {
                            name:'add',
                            value:'add'
                        },
                        {
                            name:'remove',
                            value:'remove'
                        }
                    ]
                },
                {
                    name:'word',
                    description:'Word to Add or Remove, can add multiple by separating with a comma',
                    type:'STRING',
                    required:true
                }


            ],
        }




    ],

      /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */


    run:async(client, interaction) => {

        const {guild, options} = interaction;

        const subCommand = options.getSubcommand();

        const logger = options.getChannel('logger').id ? options.getChannel('logger').id : "No Channel";
        if(!logger || logger == "No Channel"){

        }

        switch (subCommand){
            case 'clear':
                    await schema.findOneAndUpdate({Guild: guild.id},{Words:[]});
                    client.filters.set(guild.id, []);
                    interaction.followUp(`Cleared all words from the filter system`)
                        break;
            case 'list':
                const data = await schema.findOne({Guild: guild.id});
                if(!data){
                    return interaction.followUp(`No words in the filter system`)
                }

                await sourcebin.create([
                    {
                        contents:`${data.Words.map((w) => w).join("\n") || "None"}`,
                        language:'text'
                    }
                ],
                    {
                        title:`${guild.name}'s Word Filter System`,
                        description:'List of All Words in the filter system',
                    }
                ).then((bin) => {
                    interaction.followUp({content:`List of Words: ${bin.url}`})
                })

                break;
            case 'settings':
                await schema.findOneAndUpdate({Guild: guild.id},{Log:logger});
                client.filtersLog.set(guild.id, logger)

                interaction.followUp(`Added <#${logger}> as the filter system logging channel`)

                break;
            case 'config':
                
                const choice = options.getString('options');
                const words = options.getString('word').toLowerCase().split(',');
                switch (choice){
                    case 'add':

                    schema.findOne({Guild: guild.id}, async (err, data) => {
                        if(err) throw err; 
                        if(!data){
                            await schema.create({
                                Guild: guild.id, Log:null,Words:words
                            });

                            client.filters.set(guild.id, words);

                            return interaction.followUp(`Added ${words.length} new words to the filter system`)
                        }

                        const newwords = []

                        words.forEach((w) => {
                            if(data.Words.includes(w)){
                                return;
                            }
                            newwords.push(w);
                            data.Words.push(w);
                            data.Log = logger;
                            client.filters.get(guild.id).push(w);

                        })
                        interaction.followUp({content:`Added ${newwords.length} new words to the filter system`})

                        data.save();
                    })
                      break;
                    case 'remove':
                        schema.findOne({Guild: guild.id}, async (err, data) => {
                            if(err) throw err;
                            if(!data){
                                return interaction.followUp(`Word Filter System was never enabled`)
                            }

                            const removedwords = [];

                            words.forEach((w) => {
                                if(!data.words.includes(w)){
                                    return;
                                }
                                data.Words.remove(w);
                                removedwords.push(w);

                            })

                            const newarr = client.filters.get(guild.id).filter((word) => !removedwords.includes(word));

                            client.filters.set(guild.id, newarr);

                            interaction.followUp({content:`Removed ${removedwords.length} words from the filter system`})



                        })
                        data.save();
                        break;
                }
                break;
        }



    }

}