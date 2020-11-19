const ms = require('ms');
const {GiveawaysManager} = require('discord-giveaways')


module.exports = {

  name: "reroll",
  description: "rerolls giveaway",

  async execute(message,args, client){

    if (!message.member._roles.find(role => role == 768487202156970034)){
      return message.channel.send("You do not have perms to reroll giveaway")
    }

    if(!args[0]){
      return message.channel.send("No giveaway ID provided")
    }

    let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(" ")) || client.giveawaysManager.find((g) => g.messageID == args[0]);

    if(!giveaway){
      return message.channel.send("Couldnt find a giveaway with that ID")
    }

    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
      message.channel.send("Giveaway rerolled")
    })
    .catch((e) => {
      if(e.startsWith(`Giveaway with ID ${giveaway.messageID} has not ended`)){
        message.channel.send("This giveaway hasnt ended yet")
      } else {
        console.error(e);
        message.channel.send("An error occured")
      }
    })

}
}
