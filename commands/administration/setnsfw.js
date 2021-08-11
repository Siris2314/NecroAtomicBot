const Schema = require('../../schemas/nsfw')

module.exports = {
    name:'setnsfw',
    description:'Enables anti nsfw system in server mode',

    async execute(message,args,client){

        const option = args[0] 

        if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({content:'Invalid permissions'})

        if(!option){
            client.embed(message, {
                title:'No Option Provided',
                description:`Please provide an option either on or off`,
                color:'#2F3136',
                thumbnail: {
                    url:message.guild.iconURL({dynamic:true})
                },
                timestamp: Date.now(),
                
            }) 


        }
     else{

        if(option.toLowerCase() === 'on'){
            await Schema.findOne({Server:message.guild.id}, async(err,data)=>{
                if(!data){
                    new Schema({
                        Server:message.guild.id,
                    }).save()

                    client.embed(message, {
                        title:':white_check_mark: Anti-NSFW Enabled',
                        description:`${message.author.username} has enabled ANTI-NSFW in the server`,
                        color:'#2F3136',
                        thumbnail: {
                            url:message.guild.iconURL({dynamic:true})
                        },
                        timestamp: Date.now(),
                        
                    }) 
                }
                else{
                    message.channel.send({content:'Anti NSFW System was already enabled'})
                    
                }
               



            })
        }
        else if(option.toLowerCase() === 'off'){
            await Schema.findOne({Server:message.guild.id}, async(err,data)=>{
                if(!data) return message.channel.send({content:'Anti NSFW was never enabled'})
                
                data.delete()

                client.embed(message, {
                    title:':x: Anti-NSFW Disabled',
                    description:`${message.author.username} has disabled ANTI-NSFW in the server`,
                    color:'#2F3136',
                    thumbnail: {
                        url:message.guild.iconURL({dynamic:true})
                    },
                    timestamp: Date.now(),
                    
                }) 


            })

        }
        else{

            client.embed(message, {
                title:':x: Incorrect options',
                description:`Invalid option,please use <prefix> nsfw enable/disable to enable or disable this system`,
                color:'#2F3136',
                thumbnail: {
                    url:message.guild.iconURL({dynamic:true})
                },
                timestamp: Date.now(),
                
            }) 


        }

     }

    }





}

