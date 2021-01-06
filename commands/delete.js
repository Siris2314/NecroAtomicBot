const schema = require('../schemas/custom-commands.js')
const mongoose = require('mongoose')
module.exports = {

  name: 'delete',
  description: 'deletes a custom command',

  async execute(message,args,client){

    if(!message.member.hasPermission('ADMINSTRATOR')){
      return message.channel.send('Perms Denied')
    }

    const name = args[0];


    if(!name){
      return message.channel.send('Please specify command name')
    }




    const data = await schema.findOne({Guild: message.guild.id, Command: name});

    if(!data){
      return message.channel.send('This command does not exist')
    }

    await schema.findOneAndDelete({Guild: message.guild.id, Command: name})
    message.channel.send(`Removed **${name}** from custom commands`)




  }
}
