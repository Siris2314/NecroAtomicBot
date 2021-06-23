const pretty = require("pretty-ms");


module.exports = {
    name: 'uptime',
    description:'Returns Bot Uptime',
    usage:'<prefix> uptime',


    async execute(message, args,client){

        client.embed(message, {
            title:'Uptime of NecroAtomic Bot',
            description: `${pretty(client.uptime)}`,
            color:'RANDOM'

        })
        
    }
}