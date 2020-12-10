const { tictactoe } = require('reconlx')

module.exports = {
    name : 'tictactoe',
    description: 'plays tictactoe',
    async execute(message,args,client) {
        var member = message.guild.member(message.mentions.users.first());
            if(!member)  return  message.channel.send('Please specify a member')

        new tictactoe({
            player_two: member,
            message: message
        })
    }
}
