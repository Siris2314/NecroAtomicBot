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
        // let newarr = []
        // let arr = Object.values(data.fields[0])
        // newarr = arr.splice(1,2)[0].replace(/`/g, "").split(' ')
        // console.log(newarr);

        if(data && !data.error){
          message.channel.send({embed: data})
        } else{
          message.reply('Could not find docs')
        }

      })
      .catch(err => {
        console.error(err)
      })
  }


}
