const db = require('../reconDB.js')


module.exports = {

  name:'set-lang',
  description: 'Sets Language',

  async execute(message,args,client){
    if(!message.member.hasPermission('ADMINSTRATOR')){
      return message.channel.send('Cannot use this command')
    }

    const lang = args[0];

    if(!lang){
      return message.channel.send("Please Choose a Language")
    }
    await db.set(`lang-${message.guild.id}`, lang)

    message.channel.send('Language has been set to ' + lang);
  }
}
