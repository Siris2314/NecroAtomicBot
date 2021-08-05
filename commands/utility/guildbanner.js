const axios = require('axios')
require('dotenv').config()
const token = process.env.token



module.exports = {

    name:'guildbanner',
    description:'Returns Banner of Guild',




    async execute(message,args,client){


        const check = client.guilds.cache.get(args[0])

        console.log(check)
      
        axios
        .get(`https://discord.com/api/guilds/${message.guild.id}`, {
         headers: {
            Authorization:`Bot ${token}`,
         },
        
    })
  .then((res) => {
    //   console.log(res.data)

    //   if(banner){
    //     const extension = banner.startsWith("a_") ? '.gif' : '.png'
    //     url = `https://cdn.discordapp.com/banners/${member.user.id}/${banner}${extension}`
    // }

    })
}
}