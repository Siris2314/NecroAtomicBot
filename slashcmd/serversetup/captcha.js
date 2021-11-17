const Schema = require('../../schemas/captcha')
const {CommandInteraction, Client, MessageEmbed} = require('discord.js')

module.exports = {
    name: 'captcha',
    description: 'Sets up Captcha Verification System in Server mode',
    permission: 'MANAGE_SERVER',
    options:[
        {
            name:'role',
            description:'Role to be given to users who pass the captcha',
            type:'ROLE',
            required:true
        }
    ],

     /**
   *
   * @param {Client} client
   * @param {Interaction} CommandInteraction
   */


    run:async(client, interaction) => {

        const role = interaction.options.getRole("role");

        console.log(role);

        await Schema.findOne({Guild:interaction.guild.id}, async (err, data) => {
                if(data) {
                    await data.delete();
                }
                else{
                    new Schema({
                        Guild:interaction.guild.id,
                        Role:role
                    }).save()
                    
                }

             })

             let embed = new MessageEmbed()
                .setAuthor(`Captcha Setup Done`, client.user.displayAvatarURL())
                .setDescription(`Captcha's Will Be Sent To Users when joining the server`)
                .setColor("BLURPLE")
     
             interaction.followUp({ embeds: [embed] });
    }

}