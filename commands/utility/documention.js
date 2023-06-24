const axios = require('axios')
const Docs = require('discord.js-docs')
module.exports = {

  name:'docs',
  description: 'Returns Discord Documentation',

  async execute(message,args){


      const query = args.join(' ')

      const doc = await Docs.fetch('stable')
      const results = await doc.resolveEmbed(query)


      if(!results){
         return message.channel.send('Could not find in documentation')
      }

      const string = makeBetterUrl(JSON.stringify(results))

      const embed = JSON.parse(string)

      embed.author.url = `https://discord.js.org/#/docs/discord.js/stable/general/welcome`


      const extra =
  '\n\nView more here: ' +
  /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    .exec(embed.description)[0]
    .split(')')[0]

  
        for(const field of embed.fields || []){
          if(field.value.length >= 1024){
            field.value = field.value.slice(0,1024)
            const split = field.value.split(' ')
            let joined = split.join(' ')

            while(joined.length >= 1024 - extra.length){
              split.pop()
              joined = split.join(' ')
            }
            field.value = joined + extra
          }

        }

        
        if(embed.fields && embed.fields[embed.fields.length-1].value.startsWith('[View Source')){
          embed.fields.pop()
        }

        return message.channel.send({embeds:[embed]})
  }


}

const makeBetterUrl  = (string) => {
  string.replace(/docs\/docs\/disco/g, `docs/discord.js/stable`)
         .replace(/\(disco\)/g, '') 

    return string
}
