const deepai = require('deepai')
require('dotenv').config()
const token = process.env.nsfw
deepai.setApiKey(token);
module.exports = {
    name:'nsfw',
    description:'Checks for NSFW in images',

    async execute(message,args,client){

        const image = message.attachments.first().url
        let response = await deepai.callStandardApi("nsfw-detector", {
            image:image
        })

        const score = response.output.nsfw_score

        if(score + .1 >= .5){
            message.reply('This Picture classifies as NSFW')
        }
        else{
            message.reply('This Picture is not NSFW')
        }

    }

}