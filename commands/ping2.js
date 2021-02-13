module.exports = {
  name:'ping2',
  description:'pings',

  async execute(message, args,client){

    message.channel.send('Ping');
  }
}
