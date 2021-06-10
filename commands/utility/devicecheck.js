const {Client,Message,MessageEmbed} = require('discord.js');

module.exports = {
    name:'devicecheck',
    description:'Checks for deviced a current user is on',

    async execute(message,args,client){

        const user = message.mentions.users.first() || message.author;
        const devices = user.presence?.clientStatus  || {};

        const description = () => {
            
                const entries = Object.entries(devices)
                    .map((value,index) => `${index + 1}) ${value[0][0].toUpperCase()}${value[0].slice(1)}`)
                    .join("\n");
                
                return `Devices:\n ${entries}`

            
        }

        const embed = new MessageEmbed()
            .setAuthor(user.tag, user.displayAvatarURL({dynamic:true}))
            .setDescription(`${description()}  \nCurrently Logged into ${Object.entries(devices).length} device(s)`)

        message.channel.send(embed);


        
    }
}