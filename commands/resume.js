module.exports = {
    name: "resume",
    description:'resumes paused music',
    aliases: ["resume", "unpause"],
    inVoiceChannel: true,
    async execute(message, args,client){
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
        client.distube.resume(message)
        message.channel.send("Resumed the song for you :)")
    }
}
