const db = require('../reconDB.js')

module.exports = {
    name : 'captcha',
    description: 'Turns on and off captcha system',
    async execute(message, args, client){
        if(args[0] === 'on') {
            await db.set(`captcha-${message.guild.id}`, true)
            message.channel.send('Turned on captcha feature')
        } else if(args[0] === 'off') {
            await db.delete(`captcha-${message.guild.id}`)
            message.channel.send('Turned off captcha feature')
        }
    }
}
