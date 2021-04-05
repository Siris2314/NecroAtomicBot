const {Client, Message, MessageEmbed} = require('discord.js');
const Schema = require('../schemas/birthday')

module.exports ={
    name:'set-birthday',
    description: 'Sets Birthday',

    async execute(message, args,client){
        const months = {
            1:"January",
            2:"February",
            3:"March",
            4:"April",
            5:"May",
            6:"June",
            7:"July",
            8:"August",
            9:"September",
            10:"October",
            11:"November",
            12:"December",
        };

        const joined = args.join(" ")
        const split = joined.trim().split('/')
        let[day, month] = split;

        if(!day) return message.channel.send('Please specify a day')
        if(!month) return message.channel.send('Please specify a month')

        if(isNaN(day) || isNaN(month)) return message.channel.send("The date you have isnt a number")

        day = parseInt(day);
        month = parseInt(month);

        if(!day || day > 31) return message.channel.send('Wrong day format')
        if(!month || month > 12) return message.channel.send('Wrong month format')

        const convertedDay = suffixes(day);
        const convertedMonth = months[month]
        const birthdayString = `${convertedDay} of ${convertedMonth}`
        Schema.findOne({User: message.author.id}, async(err, data) => {
          try{
            if(data){
                data.Birthday = birthdayString;
                data.save();
            } else {
                new Schema({
                    User:message.author.id,
                    Birthday: birthdayString,
                }).save();
            }
        } catch(err){
            console.log(err)
        }
        });

        return message.channel.send(`Saved ${message.author.username}'s birthday to ${birthdayString}`)



    },
};

function suffixes(number){
    const converted = number.toString();
    const lastChar = converted.charAt(converted.length - 1);

    return lastChar == "1" 
    ? `${converted}st` 
    : lastChar == "2" 
    ?`${converted}nd` 
    : lastChar == "3"
    ? `${converted}rd`
    :`${converted}th`

}