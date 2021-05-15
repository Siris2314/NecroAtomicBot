const {Client, Message, MessageEmbed} = require('discord.js')
const {blacklistedWords} = require('../../index.js')
const Schema = require('../../schemas/blacklist')

module.exports = {
    name: 'blacklist',
    description: 'blacklists words',

    async execute(message,args,client){
        if(!message.member.hasPermission('ADMINSTRATOR')) return;

        const query = args[0]?.toLowerCase();
        const guild = {Guild: message.guild.id}


        if(query === "add"){
            const word = args[1]?.toLowerCase();
            if(!word) return message.channel.send('Please specify a word')

            Schema.findOne( guild, async(err, data) => {
                if(data){
                    if(data.Words.includes(word)) return message.channel.send('Word already in database')
                    data.Words.push(word)
                    data.save()
                    const getCollection = blacklistedWords.get(message.guild.id);
                    getCollection.push(word)

                } else {
                    new Schema({
                        Guild: message.guild.id,
                        Words: word,
                    }).save();

                    blacklistedWords.set(message.guild.id, [word])
                }
                message.channel.send(`${word} is now blacklisted`)
            })
        } else if(query === 'remove'){
            const word = args[1]?.toLowerCase();
            if(!word) return message.channel.send('Please specify a word')

            Schema.findOne( guild, async(err, data) => {
               if(!data) return message.channel.send('This guild has no data saved in database');

               if(!data.Words.includes(word)) return message.channel.send('That word is not in the database')

               const filtered  = data.Words.filter((target) => target !== word)

               await Schema.findOneAndUpdate(guild, {
                   Guild: message.guild.id,
                   Words:filtered,
                   

               });


               blacklistedWords.get(message.guild.id, filtered)
               message.channel.send('Word has been removed from blacklist')
            })
           
        } else if(query === 'display'){
            Schema.findOne(guild, async(err,data) => {
                if(!data) return message.channel.send('There is no data in databse')
                message.channel.send(
                    new MessageEmbed()
                        .setTitle('Blacklisted Words')
                        .setDescription(data.Words.join(','))

                )
            })
        } else if(query === "collection"){
            const getCollection = blacklistedWords.get(message.guild.id)

            if(getCollection) return message.channel.send(getCollection ,{code: 'js'})

            message.channel.send("No data")
        } else return message.channel.send('Not a valid option')


    }
}