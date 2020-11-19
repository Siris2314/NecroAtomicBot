const ms = require('ms');
const {GiveawaysManager} = require('discord-giveaways')

module.exports = {
  name: "giveaway",
  description: "Starts a giveaway",

  async execute( message, args, client){
    if (!message.member._roles.find(role => role == 768487202156970034)){
      return message.channel.send("You do not have perms to start giveaway")
    }

    let channel = message.mentions.channels.first();

    if(!channel){
      return message.channel.send("Please provide a channel")
    }

    let giveawayDuration = args[1];

    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
      return message.channel.send("Please provide a time to do giveaway")
    }

    let giveawayWinners = args[2];

    if(isNaN(giveawayWinners) || parseInt(giveawayWinners) <= 0){
      return message.channel.send("Please provide number of winners")
    }

    let giveawayPrize = args.slice(3).join(" ");

    if(!giveawayPrize){
      return message.channel.send("Please set a prize to giveaway")
    }

    client.giveawaysManager.start(channel, {
      time: ms(giveawayDuration),
      prize: giveawayPrize,
      winnerCount: giveawayWinners,
      hostedBy: message.author,
      messages: {
      giveaway: "@everyone\n\n" + "GIVEAWAY",
      giveawayEnded: "@everyone\n\n" + "GIVEAWAY ENDED",
      timeRemaining: "Time remaining: **{duration}**",
      inviteToParticipate: "Reach with 🎁 to enter",
      winMessage: "Congrats {winners}, you won **{prize}**",
      embedFooter: "Giveaway time!",
      noWinner: "Couldn't find a winner",
      hostedBy: "Hosted by {user}",
      winners: "winner(s)",
      endedAt: "Ends at",
      units :{
        seconds: "seconds",
        minutes: "minutes",
        hours: "hours",
        days: "days"
      }
    }

    })

    message.channel.send(`Giveaway starting in ${channel}`)

  }
}
