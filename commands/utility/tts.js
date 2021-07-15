const request = require("node-superfetch");

module.exports = {
    name: "tts",
    description:"Text to speech through bot",
 async execute(message, args,client){
        if (!args[0])
            return message.channel.send(
                "Please enter text to speak"
            );
        let text = args.join(" ");

        if (text.length > 1024)
            return message.channel.send(
                "Length of text must be in between 0 and 1024 characters"
            );
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel)
            return message.channel.send("Must Join VC to use this command");
        if (
            !voiceChannel
                .permissionsFor(message.client.user)
                .has(["CONNECT", "SPEAK"])
        ) {
           client.embed(message, {
                title:'Missing Permissions',
                description:'Missing Perms For The Voice Channel - [CONNECT, SPEAK], please provide to proceed',
                timestamp:Date.now()
           })
        }

        if (client.voice.connections.has(voiceChannel.guild.id)){
          client.embed(message, {
            title:'Already Converting Text',
            description:'Please Be Patience',
            timestamp: Date.now()
        })
    }
        try {
            const connection = await voiceChannel.join();
            const { url } = await request
                .get("http://tts.cyzon.us/tts")
                .query({ text });
            const dispatcher = connection.play(url);
            dispatcher.once("finish", () => voiceChannel.leave());
            dispatcher.once("error", () => voiceChannel.leave());
            return null;
        } catch (err) {
            voiceChannel.leave();
            console.log(err)
            client.embed(message, {
                title:'An Error Has Occured',
                description:'Please Try Again Later',
                timestamp: Date.now()
            })
        }
    }
};