module.exports = {

  name: 'invites',
  description: 'Sends back how many people a user has invited to server',

  async execute(message,args,client){
    const {guild} = message;

    guild.fetchInvites().then((invites) => {
      const inviteCounter = {}

    invites.forEach((invite) => {
      const {uses, inviter} = invite
      const {username, discriminator} = inviter
      const name = `${username}#${discriminator}`

      inviteCounter[name] = (inviteCounter[name] || 0) + uses
    })

    let replyText = 'Invites:'

    const sortedInvites = Object.keys(inviteCounter).sort((a, b) => inviteCounter[b] - inviteCounter[a])

    for(const invite of sortedInvites){
      const count = inviteCounter[invite]
      replyText += `\n${invite} has invited ${count} member(s) to the server`
    }

    message.channel.send(replyText);
  })
}
}
