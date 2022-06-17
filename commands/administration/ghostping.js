const Schema = require('../../schemas/ghostping')

module.exports = {

    name:'ghostping',
    description:'Enables GhostPing System',
    usage:' ghostping <on> or <off>',

    async execute(message,args,client){

        if(!message.member.permissions.has('ADMINSTRATOR')) return message.channel.send({content:'Perms denied'})

        if(!message.guild.me.permissions.has('MANAGE_GUILD') || message.guild.me.permissions.has('MANAGE_MESSAGES')) {
            return message.channel.send({content:'I must have ADMIN command to run this command'})
        }

        const option = args[0];



        if(!option){
            client.embed(message,{
                title:'No Option Provided',
                description:'Please provide an option, either on to enable or off to disable',
                color:'RANDOM',
                footer:`${message.guild.name}`,
                timestamp: Date.now(),
                thumbnail: {
                    url: message.guild.iconURL({dynamic: true})
                }
            })
        }
    else{
        if(option.toLowerCase() == "on"){

            await Schema.findOne({Guild:message.guild.id}, async(err,data)=>{
                if(data){
                    client.embed(message,{
                        title:'Ghost Ping System Already Enabled',
                        
                    })
                }
                else{
                    new Schema({
                        Guild:message.guild.id
                    }).save()
                }
            })

            client.embed(message, {
                title:'Ghost Ping System Enabled',
                description:`${message.author.username} has enabled the Ghost Ping System`,
                color:'RANDOM',
                footer:`${message.guild.name}`,
                timestamp: Date.now(),
                thumbnail: {
                    url: message.guild.iconURL({dynamic: true})
                },

            })


        }
        else if(option.toLowerCase() == "off"){
            await Schema.findOne({Guild:message.guild.id}, async(err,data)=>{
                if(data){
                    data.delete()
                    client.embed(message, {
                        title:'Ghost Ping System Disabled',
                        description:`${message.author.username} has disabled the Ghost Ping System`,
                        color:'RANDOM',
                        footer:`${message.guild.name}`,
                        timestamp: Date.now(),
                        thumbnail: {
                            url: message.guild.iconURL({dynamic: true})
                        },
        
                    })
                }
                else {
                    client.embed(message,{
                        title:'Ghost Ping System Error',
                        description:'Ghost Ping System was never enabled',
                        color:'RANDOM',
                        thumbnail: {
                            url: message.guild.iconURL({dynamic: true})
                        },
                        footer:`${message.guild.name}`,
                        timestamp: Date.now()
                    })
                    
                }
            })

        }
        else {
            client.embed(message,{
                title:'Not a valid option',
                description:'Only On and Off Options Available',
                color:'RANDOM',
                thumbnail: {
                    url: message.guild.iconURL({dynamic: true})
                },
                footer:`${message.guild.name}`,
                timestamp: Date.now()
            })
        }

    }


    }
}