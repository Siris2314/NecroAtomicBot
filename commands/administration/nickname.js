const Discord = require('discord.js')

module.exports ={

  name:"nickname",
  description:"changes user nickname",

  execute(message,args){

    if(!message.member.hasPermission('ADMINSTRATOR')) return;



    let user = message.mentions.users.first();
    if(!user){
      return message.channel.send({embed: {color: "BLUE", description: "User needs to be mentioned"}});

    }
    let nickname = args.slice(1).join(" ");
    if(!nickname){
      return message.channel.send({embed: {color: "BLUE", description:"Nickname needs to be inputed"}});
    }
    let member = message.guild.members.cache.get(user.id);

    member.setNickname(nickname);
    return message.channel.send({embed: {color: "RED", description: `Changed nickname`}});
  }
}
