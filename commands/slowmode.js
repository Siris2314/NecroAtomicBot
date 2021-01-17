module.exports = {
  name: 'slowmode',
  description: 'enables slowmode in a channel',

  async execute(message, args, client){

    const messageArray = message.content.split(' ');
    const args = messageArray.slice(1);

    message.channel.setRateLimitPerUser(args[0])
    message.channel.send(`Slowmode is now: ${args[0]}`)

    if(!args){
      message.channel.send('Turning off slow mode');
      message.channel.setRateLimitPerUser(0);
    }
  }
}
