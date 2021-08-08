const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'emoji',
    description:'turns words into emoji',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    async execute(message, args, client){
        if(!args.length){
          return message.channel.send('Please enter something to change')
        }
        const specialCodes = {
            '0': ':zero:',
            '1': ':one:',
            '2': ':two:',
            '3': ':three:',
            '4': ':four:',
            '5': ':five:',
            '6': ':six:',
            '7': ':seven:',
            '8': ':eight:',
            '9': ':nine:',
            '#': ':hash:',
            '*': ':asterisk:',
            '?': ':grey_question:',
            '!': ':grey_exclamation:',
            ' ': '   '
          }
        const text = args.join(" ").toLowerCase().split('').map(character => {
            if(/[a-z]/g.test(character)) {
                return `:regional_indicator_${character}:`
            } else if (specialCodes[character]) {
                return `${specialCodes[character]}`
            }
            return character;
        }).join('');

        message.channel.send({content:text})
    }
}
