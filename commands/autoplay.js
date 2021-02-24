module.exports = {
    name: "autoplay",
    description:'autoplays music',
    inVoiceChannel: true,
    async execute(message, args,client){
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
        client.distube.toggleAutoplay(message)
        return message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
    }
}
