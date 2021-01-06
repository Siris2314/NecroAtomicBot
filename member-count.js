module.exports = client => {
  const channelId = '796094812209414164'

  const updateMembers = guild => {
    const channel = guild.channels.cache.get(channelId)
    channel.setName(`Members: ${guild.memberCount.toLocaleString()}`)
  }

  client.on('guildMemberadd', (member) => updateMembers(member.guild))
  client.on('guildMemberRemove', (member) => updateMembers(member.guild))

  const guild = client.guilds.cache.get('768278413667991554')
  updateMembers(guild)
}
