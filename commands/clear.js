const discord = require('discord.js');

module.exports = {
  name:"clear",
  description: "clears messages",

  execute(message,args) {

    let clearAmt;



    if(isNaN(args[0]) || parseInt(args[0]) <= 0){
      message.channel.send('Please put in numbers');

    }
    if(parseInt(args[0]) > 100){
      message.channel.send('Only 100 messages can be deleted each time')
    }
    else{
      clearAmt = parseInt(args[0]);
    }
    message.channel.bulkDelete(clearAmt + 1, true);


  }
};
