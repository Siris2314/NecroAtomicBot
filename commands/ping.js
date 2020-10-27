module.exports={

  name: 'ping',
  description: 'Basic Ping Command',
  execute(message, args){
    message.channel.send('Pong!');
  },


};
