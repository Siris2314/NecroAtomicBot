const Schema = require('../../schemas/anti-spam')


module.exports = {

    name:'set-antispam',
    description:'Sets Anti-Spam System',

    async execute(message, args,client){

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Invalid Perms')

        const option = args[0];

       
     if(option.toLowerCase() === 'enable'){


            await Schema.findOne({Server: message.guild.id}, async(err, data) => {
                if(data) return message.channel.send('Anti-Spam System Already Enabled')

                new Schema({
                    Server:message.guild.id
                }).save();


                client.embed(message, {
                    title:"Anti-Spam System Enabled :white_check_mark:",
                    timestamp: Date.now(),
                    footer: {
                        text:`${message.author.username}`
                    }   
    
                })

            })


        }
        else if(option.toLowerCase() === 'disable'){

            await Schema.findOne({Server: message.guild.id}, async(err, data) => {
                if(!data) return message.channel.send('Anti-Spam System Was Never Enabled')

                data.delete()

                client.embed(message, {
                    title:"Anti-Spam System Disabled :white_check_mark:",
                    timestamp: Date.now(),
                    footer: {
                        text:`${message.author.username}`
                    }   
    
                })

            })


        }
        else{
            client.embed(message, {
                title:":x: Invalid Option",
                description:"Please use <prefix> set-antispam enable/disable to turn on/off the anti-spam system",
                timestamp: Date.now(),
                footer: {
                    text:`${message.author.username}`
                }   

            })
        }





    }



}