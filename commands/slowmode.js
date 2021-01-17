module.exports = {
  name: 'slowmode',
  description: 'enables slowmode in a channel',

  async execute(message, client){

    const messageArray = message.content.split(' ');
    const args = messageArray.slice(1);

    message.channel.setRateLimitPerUser(args[0])
    message.channel.send(`Slowmode is now: ${args[0]}`)

    if(!args){
      message.channel.send('Please provide a number to slow the channel down by')
    }
  }
}
