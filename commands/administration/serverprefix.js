const guildSchema = require('../../schemas/Guilds')

module.exports = {
    name:'serverprefix',
    description:'Returns the server prefix',

    async execute(message,args,client){

        await guildSchema.findOne({guildID:message.guild.id}, async(err, data)=>{

            
                client.embed(message,{
                    title:`Server Prefix for **${message.guild.name}**`,
                    description:`Server Prefix: ***${data.prefix}***`,
                    thumbnail: {
                        url: message.guild.iconURL({dynamic:true})
                    },
                    footer:{
                        text:`Requested by - ${message.author.username}`,
                        iconURL:message.author.displayAvatarURL({dynamic:true})
                    },
                    timestamp: Date.now()
                    
                })
            
        })

    }
}