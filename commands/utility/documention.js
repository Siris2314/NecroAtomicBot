const axios = require('axios')

module.exports = {

  name:'docs',
  description: 'Returns Discord Documentation',

  async execute(message,args){

    const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(args)}`

    axios
      .get(uri)
      .then((embed) => {
        
        const {data} = embed

        console.log(uri);
      
        if(data && !data.error){
          message.channel.send({embeds: [data]})
        } else{
          message.reply('Could not find docs')
        }

      })
      .catch(err => {
        console.error(err)
      })
  }


}
