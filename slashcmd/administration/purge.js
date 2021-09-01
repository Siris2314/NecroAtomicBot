const {CommandInteraction, Client, MessageEmbed} = require('discord.js')

module.exports = {
    name:'purge',
    description: 'purge messages from channel',
    permission: 'ADMINISTRATOR',
    options: [

        {
            name:'messages',
            description:'Enter a number of messages to clear(up to 300 messages)',
            type:'NUMBER',
            required: true,
        },
        {

            name:'target',
            description:'User messages to be deleted',
            type:'USER',
            required: false,


        }

    ],
   /**
   *
   * @param {Client} client
   * @param {CommandInteracion} interaction
   */

    run: async (client, interaction) => {

        const num = interaction.options.getNumber('messages');

        const user = interaction.options.getMember('target');

        const channel  = interaction.channel;


        const messages = channel.messages.fetch();

        if(user){
            const userMessages = (await messages).filter((e) => e.author.id === user.id)
            await channel.bulkDelete(userMessages, true);
            const embed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Deleted ${num} messages sent by ${user.user.username}`)

            await interaction.channel.send({embeds:[embed]})

        }
        else{

          if(num < 100){
            await channel.bulkDelete(num, true);

            const embed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Deleted ${num} messages in ${interaction.channel.name}`)

            await interaction.channel.send({embeds:[embed]})

          } else if(num <= 200){
              channel.bulkDelete(100, true);

              const remain = num - 100;
              setTimeout(() => {
                  channel.bulkDelete(remain, true);
              }, 1000)

              const embed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Deleted ${num} messages in ${interaction.channel.name}`)

             await interaction.channel.send({embeds:[embed]})


          }
          else if(num <=300){

            channel.bulkDelete(100, true);
            setTimeout(() => {
                channel.bulkDelete(100, true);
            }, 1000)

            const remain = num - 200;

            setTimeout(() => {
                channel.bulkDelete(remain, true);
            }, 1000)

            const embed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Deleted ${num} messages in ${interaction.channel.name}`)

            await interaction.channel.send({embeds:[embed]})



          }



        }   



    }

}