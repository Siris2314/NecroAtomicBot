module.exports = {
    name: "voicekick",
    description:"Kicks a member out of a voice channel",
    async execute(message, args,client){

      if (!message.guild.me.hasPermission(["ADMINISTRATOR"]))
        return message.channel.send(
          "Invalid perms to run command"
        ).then(m => m.delete({timeout: 10000}));
    if (!message.member.hasPermission(["MOVE_MEMBERS"])) return message.channel.send("You cannot use this command due to invalid perms").then(m => m.delete({timeout: 10000}));

      let user = message.mentions.members.first()
  
      if (!user)
        return message.channel.send(
          `Please mention user to kick from VC`
        ).then(m => m.delete({timeout: 10000}));
        
     
      let { channel } = user.voice;
  
      if (!channel) return message.channel.send(`User Is Not In Any Voice Channel!`);
  
      user.voice.kick();
      
      message.channel.send(`${user.user.username} has been kicked from ${channel}`).then(m => m.delete({timeout: 10000}));
    }
  };