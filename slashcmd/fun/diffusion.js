const { Client, CommandInteraction, MessageEmbed, MessageAttachment} = require('discord.js')
const fetch = require('node-fetch')
const {HfInference} = require('@huggingface/inference')
const hf_token = process.env.hf
const inference = new HfInference(hf_token) 
const fs = require("fs");


module.exports = {
    name:'diffusion',
    description: 'Diffusion Based Art',
    options: [
        {
            name:'query',
            description:'Image Query',
            type:'STRING',
            required:true
        },
        {
            name:'style',
            description:'Negative Prompt for Model',
            type:'STRING',
            required:false,
            choices:[
                {
                    name: "worst quality",
                    value: "worst quality"
                },
                {
                    name: "normal quality",
                    value: "normal quality"
                },
                {
                    name: "low quality",
                    value: "low quality"
                },
                {
                    name: "low res",
                    value: "low res"
                },
                {
                    name: "text",
                    value: "text"
                },
                {
                    name: "watermark",
                    value: "watermark"
                },
                {
                    name: "logo",
                    value: "logo"
                },
                {
                    name: "banner",
                    value: "banner"
                },
                {
                    name: "extra digits",
                    value: "extra digits"
                },
                {
                    name: "cropped",
                    value: "cropped"
                },
                {
                    name: "jpeg artifacts",
                    value: "jpeg artifacts"
                },
                {
                    name: "signature",
                    value: "signature"
                },
                {
                    name: "username",
                    value: "username"
                },
                {
                    name: "error",
                    value: "error"
                },
                {
                    name: "sketch",
                    value: "sketch"
                },
                {
                    name: "duplicate",
                    value: "duplicate"
                },
                {
                    name: "ugly",
                    value: "ugly"
                },
                {
                    name: "monochrome",
                    value: "monochrome"
                },
                {
                    name: "horror",
                    value: "horror"
                },
                {
                    name: "geometry",
                    value: "geometry"
                },
                {
                    name: "mutation",
                    value: "mutation"
                },
                {
                    name: "disgusting",
                    value: "disgusting"
                },
                {
                    name: "bad anatomy",
                    value: "bad anatomy"
                },
            ]
            
            
        }

    ],

    run: async (client, interaction) => {

        const description = interaction.options.getString('query')

        const negative_prompt = interaction.options.getString('style') || 'blurry'

        

        const arr = 

        await inference.textToImage({
            inputs: description,
            model: 'stabilityai/stable-diffusion-2-1',
            parameters: {
              negative_prompt: negative_prompt,
            }
          }).then(async result => {
            console.log(result)
            
            const arrayBuffer = await result.arrayBuffer(); // Awaiting the resolution of the Promise
            const buffer = Buffer.from(arrayBuffer);
    
            const filePath = './image.png'
    
            fs.writeFile(filePath, buffer, (err) => {
    
              if(err){
                console.log(err)
                return;
              }
              const attachment = new MessageAttachment(filePath);
              interaction.editReply({ files: [attachment] })
                  .then(() => {
                      // Optionally delete the file after sending
                      fs.unlink(filePath, (err) => {
                          if (err) console.error('Error deleting the file:', err);
                      });
                  })
                  .catch(console.error);
            })
    
          }).catch(err => {
            console.log(err)
            interaction.channel.send({content:'Model time out'})
          })

    }
}